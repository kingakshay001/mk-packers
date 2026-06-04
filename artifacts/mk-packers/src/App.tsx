import { useState, useRef, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  MapPin,
  Mail,
  Menu,
  X,
  Home,
  Briefcase,
  Car,
  Bike,
  Sofa,
  ShieldCheck,
  Clock,
  CreditCard,
  MessageCircle,
  Truck,
  CheckCircle2,
  ChevronRight,
  Search,
  ArrowRight,
  Star,
  Package,
  Users,
  Globe,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const queryClient = new QueryClient();

const INDIAN_CITIES = [
  "Agartala","Agra","Ahmedabad","Aizawl","Ajmer","Aligarh","Allahabad","Amravati",
  "Amritsar","Anantapur","Aurangabad","Bangalore","Bareilly","Belgaum","Bhopal",
  "Bhubaneswar","Bikaner","Bilaspur","Chandigarh","Chennai","Coimbatore","Cuttack",
  "Dehradun","Delhi","Dhanbad","Dimapur","Durgapur","Erode","Faridabad","Gandhinagar",
  "Gangtok","Ghaziabad","Gorakhpur","Greater Noida","Guntur","Gurugram","Guwahati",
  "Gwalior","Howrah","Hubli","Hyderabad","Imphal","Indore","Itanagar","Jabalpur",
  "Jaipur","Jalandhar","Jammu","Jamshedpur","Jhansi","Jodhpur","Kakinada","Kalyan",
  "Kanpur","Kochi","Kohima","Kolkata","Kollam","Kota","Kozhikode","Lucknow","Ludhiana",
  "Madurai","Mangalore","Meerut","Mumbai","Mysore","Nagpur","Nashik","Navi Mumbai",
  "Noida","Patna","Pimpri-Chinchwad","Puducherry","Pune","Raipur","Rajkot","Ranchi",
  "Rourkela","Salem","Shimla","Shillong","Siliguri","Srinagar","Surat","Thane",
  "Thiruvananthapuram","Tiruchirappalli","Tiruppur","Udaipur","Vadodara","Varanasi",
  "Vijayawada","Visakhapatnam","Warangal",
  "DLF Phase 1","DLF Phase 2","DLF Phase 3","DLF Phase 4","DLF Phase 5",
  "Sohna Road","Golf Course Road","MG Road Gurugram","Cyber City","Udyog Vihar",
  "Sector 14 Gurugram","Sector 22 Gurugram","Sector 29 Gurugram","Sector 56 Gurugram",
  "Palam Vihar","South City","Manesar","Bhiwadi","Dharuhera","Rewari","Bahadurgarh",
  "Rohini","Dwarka","Janakpuri","Lajpat Nagar","Saket","Vasant Kunj","Pitampura",
  "Karol Bagh","Connaught Place","Mayur Vihar","Indirapuram","Vaishali",
  "Kaushambi","Raj Nagar Extension","Crossings Republik",
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Andaman & Nicobar Islands","Chandigarh","Dadra & Nagar Haveli",
  "Daman & Diu","Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const formSchema = z.object({
  type: z.enum(["local", "intercity"]),
  pickup: z.string().min(2, "Pickup area is required"),
  drop: z.string().min(2, "Drop area is required"),
  name: z.string().min(2, "Full name is required"),
  mobile: z.string().regex(/^\d{10}$/, "Enter valid 10-digit mobile number"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pincode"),
});

type FormValues = z.infer<typeof formSchema>;

function CityAutocomplete({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const q = query.toLowerCase();
      setFiltered(INDIAN_CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 7));
      setOpen(true);
    } else {
      setFiltered([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <FormLabel className="text-xs font-semibold text-gray-700">{label}</FormLabel>
      <div className="relative mt-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          data-testid={`input-${label.toLowerCase().replace(/\s/g, "-")}`}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          className="w-full pl-8 pr-3 py-2.5 text-sm border border-gray-200 rounded-md bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
        />
      </div>
      <AnimatePresence>
        {open && filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
          >
            {filtered.map((city) => (
              <li
                key={city}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setQuery(city);
                  onChange(city);
                  setOpen(false);
                }}
                className="px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary cursor-pointer transition-colors flex items-center gap-2"
              >
                <MapPin size={12} className="text-primary shrink-0" />
                {city}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919728391081"
    target="_blank"
    rel="noopener noreferrer"
    data-testid="button-whatsapp-float"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={30} />
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-18 py-3">
          <a href="#home" className="flex items-center gap-3">
            <img src="/mk-logo.png" alt="MK Packers Logo" className="h-12 w-auto" />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl text-[#0f1f3d]">MK Packers</span>
              <span className="text-[11px] text-primary font-bold tracking-widest uppercase">& Movers</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <a
              href="tel:9728391081"
              data-testid="link-navbar-phone"
              className="flex items-center gap-2.5 bg-[#0f1f3d] text-white px-5 py-2.5 rounded-lg hover:bg-primary transition-all duration-300 shadow-sm"
            >
              <PhoneCall size={17} className="text-primary group-hover:text-white" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-white/60 tracking-wider uppercase">Call Us Now</span>
                <span className="font-bold text-sm">9728391081</span>
              </div>
            </a>
          </div>

          <button
            className="md:hidden p-2 text-[#0f1f3d]"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="flex flex-col p-5 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-semibold text-[#0f1f3d] hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:9728391081"
                className="flex items-center justify-center gap-2 bg-[#0f1f3d] text-white px-4 py-3 rounded-lg w-full font-bold"
              >
                <PhoneCall size={18} className="text-primary" />
                Call 9728391081
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function BookingForm() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "local",
      pickup: "",
      drop: "",
      name: "",
      mobile: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    const v = values;
    const msg =
      `Hello MK Packers & Movers!%0A%0AI want to book a shifting service.%0A%0A` +
      `*Shift Type:* ${v.type === "local" ? "Local Shifting" : "Intercity Shifting"}%0A` +
      `*Pickup Area:* ${v.pickup}%0A` +
      `*Drop Area:* ${v.drop}%0A` +
      `*Name:* ${v.name}%0A` +
      `*Mobile:* ${v.mobile}%0A` +
      `*State:* ${v.state}%0A` +
      `*Pincode:* ${v.pincode}%0A%0A` +
      `Please provide me a free quote. Thank you!`;
    window.open(`https://wa.me/919728391081?text=${msg}`, "_blank");
    setStep("success");
    setIsSubmitting(false);
  };

  return (
    <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl">
      <div className="bg-gradient-to-r from-primary to-orange-500 p-5 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full" />
        <h3 className="text-xl font-extrabold text-white relative z-10">Get a Free Quote</h3>
        <p className="text-white/80 text-sm relative z-10 mt-1">Fill in details — we will call you back</p>
      </div>

      <CardContent className="p-6 bg-white">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <Tabs defaultValue={field.value} onValueChange={field.onChange} className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="local" data-testid="tab-local">Local Shifting</TabsTrigger>
                            <TabsTrigger value="intercity" data-testid="tab-intercity">Intercity Shifting</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="pickup"
                      render={({ field }) => (
                        <FormItem>
                          <CityAutocomplete
                            label="Pickup Area / City"
                            placeholder="Search city or area..."
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="drop"
                      render={({ field }) => (
                        <FormItem>
                          <CityAutocomplete
                            label="Drop Area / City"
                            placeholder="Search city or area..."
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            data-testid="input-name"
                            className="bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-colors"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-gray-700">Mobile Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+91</span>
                            <Input
                              placeholder="10-digit number"
                              type="tel"
                              maxLength={10}
                              data-testid="input-mobile"
                              {...field}
                              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-colors"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-gray-700">State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-state" className="bg-gray-50 border-gray-200">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-52">
                              {INDIAN_STATES.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-gray-700">Pincode</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="6-digit pincode"
                              type="tel"
                              maxLength={6}
                              data-testid="input-pincode"
                              {...field}
                              className="bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    data-testid="button-get-quote"
                    disabled={isSubmitting}
                    className="w-full font-bold text-base h-12 mt-1 bg-primary hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-200 hover:shadow-lg"
                  >
                    {isSubmitting ? "Opening WhatsApp..." : "Get Free Quote on WhatsApp"}
                    {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-4"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-[#0f1f3d]">Request Submitted!</h4>
              <p className="text-sm text-gray-500">
                Your details have been sent to our team. We will contact you shortly.
              </p>
              <a
                href="https://wa.me/919728391081"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle size={18} />
                Open WhatsApp Chat
              </a>
              <button
                onClick={() => { setStep("form"); form.reset(); }}
                className="block w-full text-sm text-gray-400 hover:text-gray-600 mt-2"
              >
                Submit another request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1f3d 50%, #1a2d50 100%)" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-900/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold mb-6">
              <Truck size={15} />
              Pan-India Packers &amp; Movers
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Trusted Moving <br />
              <span className="text-primary">Across India</span> &mdash;<br />
              Based in Gurugram
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Professional packing, safe transit, and on-time delivery for homes, offices, and vehicles — anywhere in India.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 max-w-sm">
              {[
                { icon: Package, value: "5000+", label: "Moves Done" },
                { icon: Users, value: "4.9", label: "Avg Rating" },
                { icon: Globe, value: "50+", label: "Cities Served" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon size={20} className="text-primary mx-auto mb-1" />
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-white text-[#0f1f3d] hover:bg-gray-100 font-bold px-7 py-3.5 rounded-lg transition-colors shadow-lg"
              >
                Our Services
              </a>
              <a
                href="tel:9728391081"
                data-testid="link-hero-phone"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-primary hover:bg-primary/10 text-white font-bold px-7 py-3.5 rounded-lg transition-all"
              >
                <PhoneCall size={18} className="text-primary" />
                Call Now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-md lg:ml-auto"
          >
            <BookingForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-primary font-semibold text-sm border border-orange-100">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1f3d]">
              Your Trusted Partner for <span className="text-primary">Every Move</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              MK Packers &amp; Movers is a professional relocation company based in Gurugram, Haryana, serving customers across India. We combine the warmth of a local business with the reliability of a professional moving company.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are shifting your home to the next locality, relocating your office across the city, or transporting your vehicle to another state — our experienced team ensures a seamless, stress-free experience at competitive rates.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {[
                { icon: MapPin, title: "Our Office", text: "House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)" },
                { icon: Mail, title: "Email Us", text: "mkpackersandmovers24@gmail.com" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="bg-orange-100 p-2 rounded-lg text-primary shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f1f3d] text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop"
                alt="MK Packers team loading boxes"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 flex items-center gap-4 shadow-lg">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-[#0f1f3d] text-sm">Fully Insured Moves</div>
                  <div className="text-xs text-gray-500">Your belongings are protected</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-primary/20 rounded-2xl -z-10 blur-sm" />
            <div className="absolute -top-5 -right-5 w-32 h-32 bg-[#0f1f3d]/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Home Shifting", desc: "Full household relocation with careful packing of fragile items and heavy furniture.", icon: Home },
    { title: "Office Relocation", desc: "Minimal-downtime corporate shifting for a seamless business transition.", icon: Briefcase },
    { title: "Car Transportation", desc: "Safe vehicle transit using specialized enclosed or open carrier trailers.", icon: Car },
    { title: "Bike Transportation", desc: "Scratch-free two-wheeler moving with multi-layer protective packaging.", icon: Bike },
    { title: "Furniture Shifting", desc: "Expert dismantling, wrapping, transport, and reassembly of all furniture.", icon: Sofa },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-primary font-semibold text-sm border border-orange-100 mb-4">
            What We Do
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1f3d] mb-4">
            Comprehensive Moving Services
          </h2>
          <p className="text-gray-500">
            From local apartment shifts to pan-India vehicle transport, we have the right team and tools for every job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              data-testid={`card-service-${index}`}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white">
                <CardContent className="p-7">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <service.icon size={26} />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f1f3d] mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <a
                    href="https://wa.me/919728391081"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-bold text-sm hover:gap-2 transition-all gap-1"
                  >
                    Book Now <ChevronRight size={15} />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-bl-[120px] transition-transform duration-500 group-hover:scale-125" />
              <CardContent className="p-7 flex flex-col justify-center h-full relative z-10">
                <Truck size={36} className="text-primary mb-4" />
                <h3 className="text-xl font-extrabold mb-3">Need Custom Shifting?</h3>
                <p className="text-gray-300 text-sm mb-7">
                  Warehouse shifting, piano moving, industrial equipment — contact us for custom requirements.
                </p>
                <Button className="w-full bg-primary hover:bg-orange-600 text-white font-bold shadow-md" asChild>
                  <a href="tel:9728391081">
                    <PhoneCall size={16} className="mr-2" /> Call Us Now
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Fill your details", desc: "Submit your move info — pickup, drop, name, number via our quick form." },
    { num: "02", title: "WhatsApp Connect", desc: "Your details are sent directly to our team via WhatsApp for instant response." },
    { num: "03", title: "Get your free quote", desc: "Our team reviews and calls you back with a transparent estimate." },
    { num: "04", title: "Sit back & relax", desc: "We pack, move, and deliver your belongings safely and on time." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-primary font-semibold text-sm border border-orange-100 mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1f3d] mb-4">
            Move in 4 Simple Steps
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
          <div className="hidden lg:block absolute top-11 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-orange-100 via-primary/40 to-orange-100 z-0" />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="relative z-10 text-center"
            >
              <div className="w-22 h-22 mx-auto bg-gradient-to-br from-primary to-orange-500 w-[88px] h-[88px] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-orange-200">
                <span className="text-2xl font-extrabold text-white">{step.num}</span>
              </div>
              <h4 className="text-base font-extrabold text-[#0f1f3d] mb-2">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed px-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { title: "Experienced Team", desc: "Trained professionals who handle delicate electronics, glass, and heavy furniture with care.", icon: ShieldCheck },
    { title: "Safe & Secure", desc: "High-quality bubble wrap, corrugated boxes, and secured loading practices on every move.", icon: CheckCircle2 },
    { title: "On-Time Delivery", desc: "We respect your schedule and ensure pickup and delivery exactly as committed.", icon: Clock },
    { title: "Affordable Rates", desc: "Transparent pricing with zero hidden charges — the quote is the final amount.", icon: CreditCard },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1628] to-[#0f1f3d] text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-14 items-center">
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm border border-primary/30">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Why Thousands Trust <span className="text-primary">MK Packers</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Shifting can be stressful. We take that burden off your shoulders with professional service and transparent processes.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-900/30"
              asChild
            >
              <a href="tel:9728391081">
                <PhoneCall size={18} className="mr-2" />
                Speak to Our Team
              </a>
            </Button>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-11 h-11 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon size={22} />
                </div>
                <h4 className="text-base font-extrabold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      location: "DLF Phase 3 to Sohna Road, Gurugram",
      text: "Excellent service by MK Packers. They arrived on time, packed everything securely, and did not ask for a single extra rupee beyond the quoted price. Highly recommended.",
      rating: 5,
    },
    {
      name: "Priya Desai",
      location: "Office Relocation, Udyog Vihar",
      text: "We used them to shift our entire IT office. Their team handled monitors, servers, and furniture with exceptional care. Business downtime was almost zero.",
      rating: 5,
    },
    {
      name: "Amit Singh",
      location: "Car Transport, Gurugram to Chandigarh",
      text: "I was worried about sending my new car but MK Packers delivered it without a single scratch. They kept me updated throughout the transit. Very reliable.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-primary font-semibold text-sm border border-orange-100 mb-4">
            Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1f3d]">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              data-testid={`card-review-${idx}`}
            >
              <Card className="h-full border border-gray-100 shadow-sm hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-7">
                  <div className="flex gap-1 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-[#0f1f3d] text-sm">{review.name}</h5>
                      <p className="text-xs text-gray-400 mt-0.5">{review.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Which cities do you serve?", a: "We are based in Gurugram and serve all of India — from Delhi NCR, Mumbai, Bangalore, and Chennai to smaller tier-2 cities. Local, intercity, and long-distance moves are all handled." },
    { q: "How is the shifting cost calculated?", a: "Cost depends on the volume of goods, distance, packing materials, and floor access. We always provide a transparent, itemized estimate before confirming the booking." },
    { q: "Do you provide packing materials?", a: "Yes. We bring all necessary materials — bubble wrap, corrugated boxes, shrink wrap, foam padding, and tape — included in the service." },
    { q: "How much time does local shifting take?", a: "For a standard 2BHK in Gurugram, packing and loading takes 3–4 hours, unloading and unpacking another 2–3 hours. The full process is usually completed in a single day." },
    { q: "How quickly will your team respond?", a: "As soon as you submit the form, your details are sent to our WhatsApp. Our team typically responds within 30 minutes during business hours (9 AM – 8 PM)." },
    { q: "Can I track my shipment?", a: "Yes, our team provides regular updates via phone and WhatsApp throughout the transit so you always know where your belongings are." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-primary font-semibold text-sm border border-orange-100 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f1f3d]">
            Common Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border border-gray-100 rounded-xl px-5 shadow-sm hover:border-orange-100 transition-colors"
            >
              <AccordionTrigger className="text-left font-bold text-[#0f1f3d] hover:text-primary text-sm py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#0a1628] to-[#0f1f3d] p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold mb-2">Get in Touch</h2>
              <p className="text-gray-400 mb-10 text-sm">
                We are ready to help with your next move. Reach out directly or send us a WhatsApp message.
              </p>

              <div className="space-y-7">
                {[
                  {
                    icon: PhoneCall,
                    label: "Call / WhatsApp",
                    content: "+91 9728391081",
                    href: "tel:9728391081",
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    content: "mkpackersandmovers24@gmail.com",
                    href: "mailto:mkpackersandmovers24@gmail.com",
                  },
                  {
                    icon: MapPin,
                    label: "Office Address",
                    content: "House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)",
                    href: undefined,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl text-primary shrink-0">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-300 text-xs uppercase tracking-wider mb-1">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="font-bold hover:text-primary transition-colors text-sm">
                          {item.content}
                        </a>
                      ) : (
                        <p className="font-medium text-sm leading-relaxed">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500">Available Mon–Sun, 8 AM – 8 PM</p>
            </div>
          </div>

          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-extrabold text-[#0f1f3d] mb-3">Quick Callback</h3>
            <p className="text-gray-500 text-sm mb-8">
              Send us a WhatsApp message and our team will respond with a free estimate right away.
            </p>
            <Button
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#1da851] text-white h-14 text-base font-bold shadow-lg"
              asChild
            >
              <a href="https://wa.me/919728391081" target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-contact">
                <MessageCircle className="mr-2" size={20} />
                Chat on WhatsApp
              </a>
            </Button>
            <p className="text-center text-xs text-gray-400 mt-4">
              or call us at{" "}
              <a href="tel:9728391081" className="text-primary font-semibold hover:underline">
                9728391081
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#080e1d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-white p-1.5 rounded-lg">
                <img src="/mk-logo.png" alt="MK Packers" className="h-10 w-auto" />
              </div>
              <div>
                <span className="font-extrabold text-lg block leading-none">MK Packers</span>
                <span className="text-xs text-primary font-bold tracking-widest uppercase">& Movers</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Pan-India packers and movers based in Gurugram, Haryana. Safe, reliable, and affordable shifting services for homes, offices, and vehicles.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919728391081"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#25D366] rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:9728391081"
                className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
              >
                <PhoneCall size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-base mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Contact Us", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <ChevronRight size={14} className="text-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-base mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              {[
                { icon: PhoneCall, content: "+91 9728391081", href: "tel:9728391081" },
                { icon: Mail, content: "mkpackersandmovers24@gmail.com", href: "mailto:mkpackersandmovers24@gmail.com" },
                { icon: MapPin, content: "House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)", href: undefined },
              ].map((item) => (
                <li key={item.content} className="flex items-start gap-3 text-gray-400">
                  <item.icon size={16} className="text-primary shrink-0 mt-0.5" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors break-all">{item.content}</a>
                  ) : (
                    <span className="leading-relaxed">{item.content}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10 text-gray-600 text-xs">
          <p>© 2024 MK Packers &amp; Movers. All Rights Reserved. Based in Gurugram, Haryana, India.</p>
        </div>
      </div>
    </footer>
  );
};

function HomeRoute() {
  return (
    <div className="min-h-screen font-sans bg-white selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Features />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRoute} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
