import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const featuredProperties = [
    {
      id: "1",
      title: "Luxury 3BHK Apartment in Bandra",
      price: 85000,
      type: "rent",
      location: "Bandra West, Mumbai",
      image: "https://placehold.co/400x300?text=Luxury+3BHK+apartment+with+modern+amenities+and+city+view",
      area: "1200",
      bhk: "3",
      propertyType: "apartment"
    },
    {
      id: "2",
      title: "Modern Villa with Garden",
      price: 12500000,
      type: "buy",
      location: "Whitefield, Bangalore",
      image: "https://placehold.co/400x300?text=Modern+villa+with+beautiful+garden+and+swimming+pool",
      area: "2500",
      bhk: "4",
      propertyType: "villa"
    },
    {
      id: "3",
      title: "Commercial Office Space",
      price: 125000,
      type: "rent",
      location: "Cyber City, Gurgaon",
      image: "https://placehold.co/400x300?text=Premium+commercial+office+space+with+modern+facilities",
      area: "1800",
      bhk: null,
      propertyType: "office"
    }
  ];

  const cities = [
    { name: "Mumbai", properties: "15,000+", image: "https://placehold.co/300x200?text=Mumbai+skyline+with+marine+drive+and+modern+buildings" },
    { name: "Delhi", properties: "12,000+", image: "https://placehold.co/300x200?text=Delhi+cityscape+with+India+gate+and+urban+architecture" },
    { name: "Bangalore", properties: "18,000+", image: "https://placehold.co/300x200?text=Bangalore+IT+hub+with+modern+tech+parks+and+greenery" },
    { name: "Hyderabad", properties: "8,500+", image: "https://placehold.co/300x200?text=Hyderabad+HITEC+city+with+contemporary+office+buildings" },
    { name: "Pune", properties: "10,200+", image: "https://placehold.co/300x200?text=Pune+residential+areas+with+hills+and+modern+developments" },
    { name: "Chennai", properties: "9,800+", image: "https://placehold.co/300x200?text=Chennai+coastal+city+with+IT+corridor+and+beaches" }
  ];

  const stats = [
    { label: "Properties Listed", value: "100,000+" },
    { label: "Happy Customers", value: "50,000+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Years of Experience", value: "10+" },
  ];

  const features = [
    {
      title: "Verified Properties",
      description: "All properties are verified by our team to ensure authenticity and quality.",
      icon: "✓"
    },
    {
      title: "Expert Guidance",
      description: "Get expert advice from our real estate professionals throughout your journey.",
      icon: "🏠"
    },
    {
      title: "Secure Transactions",
      description: "Safe and secure payment processing with complete transaction transparency.",
      icon: "🔒"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with all your queries.",
      icon: "📞"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Discover the perfect property for rent or purchase from our extensive collection of verified listings
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 shadow-xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-3">Location</label>
                  <input
                    type="text"
                    placeholder="Enter city, locality..."
                    className="px-3 py-2 text-gray-900 rounded-md focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-3">Property Type</label>
                  <select className="px-3 py-2 text-gray-900 rounded-md focus:outline-none">
                    <option>All Types</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Villa</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1 ml-3">Budget</label>
                  <select className="px-3 py-2 text-gray-900 rounded-md focus:outline-none">
                    <option>Any Budget</option>
                    <option>Under ₹50L</option>
                    <option>₹50L - ₹1Cr</option>
                    <option>₹1Cr - ₹2Cr</option>
                    <option>Above ₹2Cr</option>
                  </select>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked properties that offer the best value and quality for your investment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      property.type === 'rent' ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                  >
                    For {property.type === 'rent' ? 'Rent' : 'Sale'}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription>{property.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{property.price.toLocaleString()}
                      {property.type === 'rent' && '/month'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{property.area} sq ft</span>
                    {property.bhk && <span>{property.bhk} BHK</span>}
                    <span className="capitalize">{property.propertyType}</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/properties/${property.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Cities
            </h2>
            <p className="text-xl text-gray-600">
              Explore properties in India&apos;s most sought-after locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={`/properties?city=${city.name.toLowerCase()}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-semibold">{city.name}</h3>
                    <p className="text-xs text-gray-200">{city.properties} properties</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RealEstate Pro
            </h2>
            <p className="text-xl text-gray-600">
              We provide the most comprehensive and reliable real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect home through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-blue-600" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/properties/add">List Your Property</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}