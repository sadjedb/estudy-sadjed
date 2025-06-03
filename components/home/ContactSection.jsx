import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="w-full py-12 md:py-16 bg-white">
      <div className=" px-8 md:px-10 flex items-center justify-center flex-col">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
          <p className="max-w-[700px] text-muted-foreground text-lg">
            Have questions? Get in touch with our academic departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Send us an email and we'll get back to you as soon as possible.
              </p>
              <Button asChild variant="outline">
                <a href="mailto:academics@univ-setif.dz">
                  academics@univ-setif.dz
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Call our administration office during working hours.
              </p>
              <Button asChild variant="outline">
                <a href="tel:+213361234567">+213 36 12 34 567</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                University of Sétif
                <br />
                Science Building, 2nd Floor
                <br />
                Sétif, Algeria
              </p>
              <Button asChild variant="outline">
                <a
                  href="https://www.google.com/maps/place/Universit%C3%A9+S%C3%A9tif+1+Ferhat+Abbas/@36.1921287,5.3597631,3670m/data=!3m1!1e3!4m6!3m5!1s0x12f33e4f3fe02cdf:0x1dc93d8ec5f1cf93!8m2!3d36.1961376!4d5.3597161!16s%2Fg%2F11_pkvncc?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Map
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
