"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  type: 'rent' | 'buy';
  category: 'residential' | 'commercial';
  propertyType: string;
  bhk?: number;
  area: number;
  location: {
    address: string;
    city: string;
    state: string;
  };
  images: string[];
  amenities: string[];
  isFeatured: boolean;
  views: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bhk: '',
    city: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 12
  });

  useEffect(() => {
    fetchProperties();
  }, [filters, pagination.current]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
      
      queryParams.append('page', pagination.current.toString());
      queryParams.append('limit', pagination.limit.toString());

      const response = await fetch(`/api/properties?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setProperties(data.properties);
        setPagination(prev => ({
          ...prev,
          pages: data.pagination.pages,
          total: data.pagination.total
        }));
      } else {
        toast.error('Failed to load properties');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error loading properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  const formatPrice = (price: number, type: string) => {
    return `₹${price.toLocaleString()}${type === 'rent' ? '/month' : ''}`;
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      category: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bhk: '',
      city: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-xl text-gray-600">
            Browse through {pagination.total} verified properties across India
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search & Filter Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Input
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
              
              <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property For" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />

              <Input
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />

              <Select value={filters.bhk} onValueChange={(value) => handleFilterChange('bhk', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="BHK" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any BHK</SelectItem>
                  <SelectItem value="1">1 BHK</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4 BHK</SelectItem>
                  <SelectItem value="5">5+ BHK</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="City"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="flex gap-2">
                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="views">Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">High to Low</SelectItem>
                    <SelectItem value="asc">Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48"></div>
                <CardHeader>
                  <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                  <div className="bg-gray-300 h-3 w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
                  <div className="bg-gray-300 h-10 w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {properties.map((property) => (
                <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={property.images[0]}
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
                    {property.isFeatured && (
                      <Badge className="absolute top-3 right-3 bg-orange-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {property.location.city}, {property.location.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.price, property.type)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{property.area} sq ft</span>
                      {property.bhk && <span>{property.bhk} BHK</span>}
                      <span className="capitalize">{property.propertyType}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/properties/${property._id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                  disabled={pagination.current === 1}
                >
                  Previous
                </Button>
                
                <span className="text-sm text-gray-600">
                  Page {pagination.current} of {pagination.pages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                  disabled={pagination.current === pagination.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters to find more properties.
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}