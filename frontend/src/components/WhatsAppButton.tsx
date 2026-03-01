import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';

interface WhatsAppButtonProps {
  vehicle?: {
    id: string;
    make: string;
    model: string;
    year: number;
    stockNumber: string;
  };
  variant?: 'default' | 'floating';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  vehicle, 
  variant = 'floating' 
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: vehicle 
      ? `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Stock: ${vehicle.stockNumber})`
      : "Hi, I'd like to know more about your vehicles"
  });
  
  const { addNotification } = useNotifications();

  // WhatsApp business number (replace with your actual number)
  const WHATSAPP_NUMBER = "+27110001234"; // South Africa format
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(
      `*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n\n${formData.message}`
    );
    
    // Open WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    // Show notification
    addNotification({
      title: 'WhatsApp Chat Initiated',
      message: `You've started a chat with our sales team`,
      type: 'success'
    });
    
    setOpen(false);
  };

  if (variant === 'floating') {
    return (
      <>
        {/* Floating WhatsApp Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 group"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:animate-pulse">
                1
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                Chat with AutoDrive
              </DialogTitle>
              <DialogDescription>
                Send us a message on WhatsApp and we'll get back to you within minutes.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+27 12 345 6789"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  <Send className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Inline button for vehicle detail page
  return (
    <Button
      onClick={() => {
        const message = encodeURIComponent(
          `Hi, I'm interested in the ${vehicle?.year} ${vehicle?.make} ${vehicle?.model} (Stock: ${vehicle?.stockNumber})`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
        
        addNotification({
          title: 'WhatsApp Chat Initiated',
          message: `You've started a chat about the ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`,
          type: 'success'
        });
      }}
      className="bg-green-500 hover:bg-green-600 w-full"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Chat on WhatsApp
    </Button>
  );
};

export default WhatsAppButton;