import React, { useState } from "react";
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
  ChevronRight
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const queryClient = new QueryClient();

// Form Schema
const formSchema = z.object({
  type: z.enum(["local", "intercity"]),
  pickup: z.string().min(1, "Pickup area is required"),
  drop: z.string().min(1, "Drop area is required"),
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(10, "Valid mobile number is required")
});

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919728391081"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={32} />
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src="/mk-logo.png" alt="MK Packers Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-secondary">MK Packers</span>
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">& Movers</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a href="tel:9728391081" className="flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-md hover:bg-secondary/90 transition-colors">
              <PhoneCall size={18} className="text-primary" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-white/70">Call Us Anytime</span>
                <span className="font-bold">9728391081</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-secondary hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="tel:9728391081" className="flex items-center justify-center gap-2 bg-secondary text-white px-4 py-3 rounded-md w-full">
                <PhoneCall size={20} className="text-primary" />
                <span className="font-bold">Call 9728391081</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "local",
      pickup: "",
      drop: "",
      name: "",
      mobile: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const message = `Hello MK Packers,%0A%0AI want to get a free quote for shifting.%0A%0A*Type:* ${values.type === 'local' ? 'Local Shifting' : 'Intercity Shifting'}%0A*Pickup:* ${values.pickup}%0A*Drop:* ${values.drop}%0A*Name:* ${values.name}%0A*Mobile:* ${values.mobile}%0A%0APlease contact me.`;
    window.open(`https://wa.me/919728391081?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-secondary">
      {/* Background Graphic/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/40 z-10" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 mb-6">
              <Truck size={16} />
              <span className="text-sm font-semibold tracking-wide">TOP RATED IN GURUGRAM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Trusted <span className="text-primary">Packers & Movers</span> in Gurugram
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Dependable, safe, and professional shifting services for your home and office. We handle your belongings with the care they deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="inline-flex items-center justify-center bg-white text-secondary hover:bg-gray-100 font-bold px-8 py-3.5 rounded-md transition-colors">
                Explore Services
              </a>
              <a href="tel:9728391081" className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-md transition-colors">
                <PhoneCall size={20} />
                9728391081
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto w-full max-w-md"
          >
            <Card className="border-0 shadow-2xl overflow-hidden rounded-xl">
              <div className="bg-primary p-4 text-center">
                <h3 className="text-xl font-bold text-white">Get a Free Quote</h3>
                <p className="text-primary-foreground/80 text-sm">We'll call you back instantly</p>
              </div>
              <CardContent className="p-6 bg-white">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <Tabs 
                            defaultValue={field.value} 
                            onValueChange={field.onChange} 
                            className="w-full"
                          >
                            <TabsList className="grid w-full grid-cols-2 mb-2">
                              <TabsTrigger value="local">Local Shifting</TabsTrigger>
                              <TabsTrigger value="intercity">Intercity Shifting</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pickup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Pickup Area</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. DLF Phase 3" {...field} className="bg-gray-50" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="drop"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Drop Area</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Sohna Road" {...field} className="bg-gray-50" />
                            </FormControl>
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
                          <FormLabel className="text-xs">Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} className="bg-gray-50" />
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
                          <FormLabel className="text-xs">Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit mobile number" type="tel" {...field} className="bg-gray-50" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full font-bold text-lg h-12 mt-2">
                      Get Free Quote
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-primary font-medium text-sm">
              About MK Packers & Movers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Your Trusted Relocation Partner in <span className="text-primary">Gurugram</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a reliable and professional packing and moving company rooted right here in Gurugram. With years of experience handling local home shifting, corporate relocations, and vehicle transportation, we take the stress out of your move.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team uses high-quality packing materials and secure transport vehicles to ensure your belongings arrive safely and on time. We believe in transparent pricing, clear communication, and treating your items like our own.
            </p>
            
            <div className="pt-4 border-t border-gray-100 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Locate Us</h4>
                  <p className="text-xs text-gray-500 mt-1">House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">Email Us</h4>
                  <p className="text-xs text-gray-500 mt-1 break-all">mkpackersandmovers24<br/>@gmail.com</p>
                </div>
              </div>
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
                src="https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=2070&auto=format&fit=crop" 
                alt="Packers loading boxes" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-secondary rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Home Shifting",
      desc: "Complete household relocation with careful packing of fragile items and heavy furniture.",
      icon: Home,
    },
    {
      title: "Office Relocation",
      desc: "Swift and secure corporate shifting to minimize your business downtime.",
      icon: Briefcase,
    },
    {
      title: "Car Transportation",
      desc: "Safe transit of your vehicle using specialized car carrier trailers.",
      icon: Car,
    },
    {
      title: "Bike Transportation",
      desc: "Scratch-free two-wheeler moving with multi-layer protective packaging.",
      icon: Bike,
    },
    {
      title: "Furniture Shifting",
      desc: "Expert dismantling, packing, and reassembly of bulky and delicate furniture.",
      icon: Sofa,
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-primary font-medium text-sm mb-4">
            Services We Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Comprehensive Moving Solutions
          </h2>
          <p className="text-gray-600">
            From local apartment shifts to intercity vehicle transport, we have the right team and tools for every job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <a href="https://wa.me/919728391081" className="inline-flex items-center text-primary font-semibold text-sm hover:underline">
                    Book Now <ChevronRight size={16} className="ml-1" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 5 * 0.1 }}
          >
            <Card className="h-full border-none shadow-md bg-secondary text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110"></div>
              <CardContent className="p-8 flex flex-col justify-center h-full relative z-10">
                <h3 className="text-2xl font-bold mb-4">Need Custom Shifting?</h3>
                <p className="text-gray-300 text-sm mb-8">
                  Contact us directly for warehouse shifting, fine art moving, or custom requirements.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white" asChild>
                  <a href="tel:9728391081">Call Us Now</a>
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
    {
      num: "01",
      title: "Tell us about your move",
      desc: "Submit your details via our form or call us directly with your requirements.",
    },
    {
      num: "02",
      title: "Get a free quote",
      desc: "We provide a transparent, competitive estimate based on your inventory and distance.",
    },
    {
      num: "03",
      title: "Schedule survey",
      desc: "Our team visits your location (if needed) to assess and plan the packing process.",
    },
    {
      num: "04",
      title: "Sit back & relax",
      desc: "We arrive on time, pack securely, transport safely, and deliver to your new doorstep.",
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Shift in 4 Easy Steps
          </h2>
          <p className="text-gray-600">
            A streamlined process designed to give you complete peace of mind.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-white border-4 border-orange-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="text-3xl font-bold text-primary">{step.num}</span>
              </div>
              <h4 className="text-lg font-bold text-secondary mb-2">{step.title}</h4>
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
    {
      title: "Experienced Team",
      desc: "Trained packers who know how to handle delicate electronics, glass, and heavy furniture.",
      icon: ShieldCheck,
    },
    {
      title: "Safe & Secure",
      desc: "High-quality bubble wraps, corrugated boxes, and secure loading practices.",
      icon: CheckCircle2,
    },
    {
      title: "On-Time Delivery",
      desc: "We respect your schedule and ensure prompt pickup and delivery as committed.",
      icon: Clock,
    },
    {
      title: "Affordable Rates",
      desc: "Transparent pricing with no hidden charges at the time of delivery.",
      icon: CreditCard,
    }
  ];

  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose MK Packers?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Shifting homes or offices is stressful. We exist to take that burden off your shoulders with professional service you can trust.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto" asChild>
              <a href="tel:9728391081">Speak to our team</a>
            </Button>
          </div>
          
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <feature.icon className="text-primary mb-4" size={32} />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
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
      location: "Shifted from DLF Phase 3 to Sohna Road",
      text: "Excellent service by MK Packers. They arrived on time, packed everything securely, and didn't ask for a single extra rupee over the quoted price. Highly recommended for local shifts."
    },
    {
      name: "Priya Desai",
      location: "Office Relocation in Udyog Vihar",
      text: "We used them for moving our IT office. Their team was very professional and handled all the monitors and servers with great care. Saved us a lot of downtime."
    },
    {
      name: "Amit Singh",
      location: "Car Transport to Chandigarh",
      text: "I was worried about sending my new car, but MK Packers delivered it without a single scratch. Kept me updated throughout the transit. Very reliable."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here is what families and businesses in Gurugram think of our service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none shadow-md bg-white">
                <CardContent className="p-8">
                  <div className="flex text-orange-400 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    "{review.text}"
                  </p>
                  <div>
                    <h5 className="font-bold text-secondary">{review.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">{review.location}</p>
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
    {
      q: "What areas do you serve?",
      a: "We are based in Gurugram and serve the entire Delhi NCR region for local shifting. We also provide intercity shifting and vehicle transport across major cities in India."
    },
    {
      q: "How is the shifting cost calculated?",
      a: "Cost depends on the volume of goods, distance, packing materials required, and floor level (if elevators aren't available). We provide a free estimate before booking."
    },
    {
      q: "Do you provide packing materials?",
      a: "Yes, we bring all necessary packing materials including bubble wrap, corrugated boxes, shrink wrap, and tape to ensure the safety of your items."
    },
    {
      q: "How much time does local shifting take?",
      a: "For a standard 2BHK in Gurugram, packing and loading usually takes 3-4 hours, and unloading/unpacking takes another 2-3 hours. The entire process is completed in a single day."
    },
    {
      q: "Can I move my car/bike with my household goods?",
      a: "Yes, we offer specialized vehicle transportation services. Vehicles are usually transported in dedicated carriers to ensure maximum safety."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-200">
              <AccordionTrigger className="text-left font-semibold text-secondary hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
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
    <section id="contact" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-secondary p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
              <p className="text-gray-400 mb-10">We're ready to help with your next move. Reach out to us directly.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-primary">
                    <PhoneCall size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 text-sm mb-1">Call / WhatsApp</h4>
                    <a href="tel:9728391081" className="text-xl font-bold hover:text-primary transition-colors">
                      +91 9728391081
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 text-sm mb-1">Email</h4>
                    <a href="mailto:mkpackersandmovers24@gmail.com" className="text-lg font-medium hover:text-primary transition-colors break-all">
                      mkpackersandmovers24@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 text-sm mb-1">Office Address</h4>
                    <p className="text-md font-medium leading-relaxed">
                      House No. 210A, Gali No. 5,<br/>
                      Om Nagar Krishna Chowk,<br/>
                      Gurugram - 122001 (Hr.)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-secondary mb-6">Need a quick callback?</h3>
            <p className="text-gray-500 mb-8">Send us a WhatsApp message and our team will get back to you with a free estimate immediately.</p>
            <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-14 text-lg" asChild>
              <a href="https://wa.me/919728391081" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1 rounded">
                <img src="/mk-logo.png" alt="MK Packers Logo" className="h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-none">MK Packers</span>
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">& Movers</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Dependable packers and movers based in Gurugram. We provide safe, secure, and on-time shifting services for homes and offices.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors text-sm">Our Services</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-white/10 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <PhoneCall size={18} className="text-primary shrink-0 mt-0.5" />
                <a href="tel:9728391081" className="hover:text-white transition-colors">+91 9728391081</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary shrink-0 mt-0.5" />
                <a href="mailto:mkpackersandmovers24@gmail.com" className="hover:text-white transition-colors break-all">mkpackersandmovers24@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">House No. 210A, Gali No. 5, Om Nagar Krishna Chowk, Gurugram - 122001 (Hr.)</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="text-center pt-8 border-t border-white/10 text-gray-500 text-xs">
          <p>© 2024 MK Packers & Movers. All Rights Reserved.</p>
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
