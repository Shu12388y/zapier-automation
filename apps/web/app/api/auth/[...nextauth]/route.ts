// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { NextAuthOptions } from "next-auth";

// Define user profile type
interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

interface BackendResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

// Configure NextAuth options
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile: GoogleProfile) {
        try {
          // Try to register or login the user with your backend
          const response = await axios.post<BackendResponse>(
            `${process.env.BACKEND_URL}/api/v1/auth`,
            {
              email: profile.email,
              firstname: profile.given_name,
              lastname: profile.family_name,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          // If successful, return the user profile
          if (response.status === 201 || response.status === 200) {
            console.log("User authenticated with backend successfully");
            return {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              firstName: profile.given_name,
              lastName: profile.family_name,
            };
          } else {
            // This might not execute since non-2xx responses will throw an error
            console.warn("Backend returned non-success response:", response.status);
            throw new Error(`Backend returned status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error authenticating with backend:", error);
          
          // Handle duplicate email error specifically
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{message?: string}>;
            
            // Check if it's a duplicate email error
            if (axiosError.response?.status === 409 || 
               (axiosError.response?.data && 
                typeof axiosError.response.data === 'object' && 
                'message' in axiosError.response.data && 
                axiosError.response.data.message?.toLowerCase().includes('duplicate'))) {
              console.warn("Duplicate email detected");
              throw new Error("Email already exists. Please use a different email or sign in method.");
            }
          }
          
          // For other errors, still return the profile so login can continue
          // You might want to change this behavior based on your requirements
          console.warn("Returning profile despite backend error");
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            firstName: profile.given_name,
            lastName: profile.family_name,
          };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        console.log("Google sign in successful for:", user.email);
      }
      return true;
    },
    async session({ session}) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Customize redirect behavior if needed
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    error: '/auth/error', // Custom error page to display auth errors
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Create handler with the auth options
const handler = NextAuth(authOptions);

// Export Next.js App Router handlers
export { handler as GET, handler as POST };