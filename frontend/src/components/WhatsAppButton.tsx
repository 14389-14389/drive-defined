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

  // Kenyan WhatsApp number
  const WHATSAPP_NUMBER = "+254726894129";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const encodedMessage = encodeURIComponent(
      `*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n\n${formData.message}`
    );
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 group"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center group-hover:animate-pulse">
                1
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md mx-4 sm:mx-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                <MessageCircle className="h-5 w-5 text-green-500" />
                Chat with AutoDrive
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Send us a message on WhatsApp and we'll get back to you within minutes.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0726 894 129"
                  required
                  className="h-10 sm:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                  className="text-sm"
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-600">
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
      className="bg-green-500 hover:bg-green-600 w-full text-sm sm:text-base py-2 sm:py-3"
    >
      <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
      Chat on WhatsApp
    </Button>
  );
};

export default WhatsAppButton;