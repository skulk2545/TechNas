import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Zod schema for form validation
const formSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    country_code: z.string().min(1, "Country code is required"),
    phone_number: z.string().regex(/^[0-9]{7,14}$/, "Please enter a valid mobile number"),
});

type FormValues = z.infer<typeof formSchema>;

interface ConsultationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            country_code: "+91",
            phone_number: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        const submissionData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            mobile_number: `${data.country_code}${data.phone_number}`,
        };

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://technas.onrender.com";
            const response = await fetch(`${backendUrl}/api/consultation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            toast.success("Request submitted successfully!", {
                description: "We will be in touch with you shortly.",
            });
            form.reset();
            onOpenChange(false);
        } catch (error) {
            toast.error("Failed to submit request", {
                description: "Please try again later or contact us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-display text-bloom">Request a Consultation</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Enter your details below and our team will get back to you to structure your next steps.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="First Name"
                                                className={`bg-background/50 ${form.formState.errors.first_name ? 'border-destructive' : 'border-border'}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Last Name"
                                                className={`bg-background/50 ${form.formState.errors.last_name ? 'border-destructive' : 'border-border'}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Email here"
                                            type="email"
                                            className={`bg-background/50 ${form.formState.errors.email ? 'border-destructive' : 'border-border'}`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="country_code"
                                render={({ field }) => (
                                    <FormItem className="w-1/3">
                                        <FormLabel>Code</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background/50 border-border">
                                                    <SelectValue placeholder="Code" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="+1">+1 (US)</SelectItem>
                                                <SelectItem value="+44">+44 (UK)</SelectItem>
                                                <SelectItem value="+91">+91 (IN)</SelectItem>
                                                <SelectItem value="+61">+61 (AU)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Mobile number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="1234567890"
                                                type="tel"
                                                className={`bg-background/50 ${form.formState.errors.phone_number ? 'border-destructive' : 'border-border'}`}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="pt-4 flex justify-end">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="glow-sm">
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
