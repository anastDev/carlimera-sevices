

export type {
  AnimationType,
  ApiErrorResponse,
  BlockDetailResponse,
  BlockListResponse,
  BlockMeta,
  BlockQueryParams,
  BlockType,
  Complexity,
  ComponentCategory,
  ComponentDetailResponse,
  ComponentListResponse,
  ComponentMeta,
  ComponentQueryParams,
  PaginatedResponse,
} from "./component-meta";

export type {
  ParseFailure,
  ParseResult,
  ParseSuccess,
  SmoothUIPackageMeta,
} from "./smoothui-schema";

export { parseSmoothUIMeta } from "./smoothui-schema";

// ---------------------------------------------------------------------------
// People data
// ---------------------------------------------------------------------------

/**
 * Unified Person interface for all people data
 *
 * This single interface contains all possible fields for people data.
 * Components can use only the fields they need:
 * - Team components: name, role, bio, avatar, location, experience, social, company
 * - Testimonial components: name, role, avatar, stars, content
 * - Mixed components: any combination of fields
 */
export interface Person {
  review?: string;
  fullName: string;
  stars?: number;
}

export const peopleData: Person[] = [
  {
    fullName: "Hannah Fearon",
      stars: 5,
      review:
      "Do not hesitate to trust this dealer. I have had such a great experience buying from them. My car had some issues when it was only just within warranty. Not only did they come and collect my car from Nottingham, they fixed the issues and a couple of other things that I had broken that weren't covered by the warranty. I would definitely recommend to anyone, and will certainly be buying my next car from them.",
  },
    {
        fullName: "Emmanuel Arhinful",
        stars: 5,
        review:
            "CARlimera offers an outstanding services. I experienced a huge and terrible experiences from a car a previously bought and sold it out of frustrations was going through daily. Meeting CARlimera was a very good chance and a place to be. I've had not a single problem using my first car I bought from them over 5 Months now and have recently gotten another one for a colleague at work. They sell good cars with no issues and are very trustworthy. Excellent services delivery and I highly recommend them to anyone who needs a car..",
    },
    {
        fullName: "Samuel Pernouto",
        stars: 5,
        review:
            "Got my first car in a really great price. The team made sure I got a new MOT . Been happy with my purchase . Would definitely recommend to a friend.",
    },
    {
        fullName: "Saeed Abdul muomin",
        stars: 5,
        review:
            "CARlimera is one in a million,had an amazing services and quality moment while getting my new car. I will recommend everyone getting a car go through CARlimera if they can,the cars are well looked after and ready to go,test driving and viewings are just phone call away,very patient and very honest Car Dealership.\n" +
            "CARlimera Services is the Best .",
    },
    {
        fullName: "Maria Cocula",
        stars: 5,
        review:
            "I was very happy with my purchase of the Ford Fiesta and with the overall services provided by the CARlimera. The process was smooth, professional, and trustworthy from start to finish. I can definitely recommend them to anyone looking for a reliable car.",
    },
    {
        fullName: "Morenikeji Balogun",
        stars: 5,
        review:
            "Recently reached out to the team to make enquiries about a car i intended to purchase. The team were professional, ready to answer and polite in their approach. The car was delivered in 24hrs and i was updated each step of the way even on a Sunday. The only way to really thank them is to leave a 5star review. Thank you for such a pleasant experience. I'll definitely be back.",
    },
];

// Get people who have testimonials (stars and content)
export const testimonialsData: Person[] = peopleData.filter(
  (person) => person.stars && person.review
);
//
// interface ImageKitOptions {
//   format?: "auto" | "webp" | "jpg" | "jpeg" | "png" | "avif";
//   height?: number;
//   quality?: number;
//   transformations?: string;
//   width?: number;
// }

/**
 * Build transformation string from options
//  */
// function buildTransformations(options?: ImageKitOptions): string {
//   if (options?.transformations) {
//     return options.transformations;
//   }
//
//   const parts: string[] = [];
//
//   if (options?.width) {
//     parts.push(`w-${options.width}`);
//   }
//   if (options?.height) {
//     parts.push(`h-${options.height}`);
//   }
//
//   const quality = options?.quality ?? 80;
//   parts.push(`q-${quality}`);
//
//   const format = options?.format ?? "auto";
//   parts.push(`f-${format}`);
//
//   return parts.join(",");
// }

/**
 * Process full URL and add transformations
 */
// function processFullUrl(imagePath: string, transformations: string): string {
//   const url = new URL(imagePath);
//   url.searchParams.delete("updatedAt");
//   const baseUrl = url.origin + url.pathname;
//
//   if (!transformations) {
//     return baseUrl;
//   }
//   return `${baseUrl}?tr=${transformations}`;
// }

/**
 * Build local path URL
 */
// function buildLocalPathUrl(imagePath: string, transformations: string): string {
//   const endpoint =
//       import.meta.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
//       import.meta.env.IMAGEKIT_URL_ENDPOINT ||
//     "https://ik.imagekit.io/16u211libb";
//
//   const cleanPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
//
//   const imageKitPath = cleanPath.startsWith("images/")
//     ? `smoothui/${cleanPath.replace("images/", "")}`
//     : `smoothui/${cleanPath}`;
//
//   const baseUrl = `${endpoint}/${imageKitPath}`;
//
//   if (transformations) {
//     return `${baseUrl}?tr=${transformations}`;
//   }
//
//   return baseUrl;
// }
//
// /**
//  * Get ImageKit URL for an image with optimized transformations
//  * Converts local image paths (/images/...) to ImageKit URLs with bandwidth optimization
//  * @param imagePath - Local image path (e.g., "/images/avatar.jpg") or already full URL
//  * @param options - Optional transformation options
//  * @param options.width - Image width in pixels
//  * @param options.height - Image height in pixels
//  * @param options.quality - Image quality (1-100, default: 80)
//  * @param options.format - Image format (auto, webp, jpg, png, etc.)
//  * @param options.transformations - Raw transformation string (overrides other options)
//  * @returns Full ImageKit URL with optimized transformations
//  */
// export function getImageKitUrl(
//   imagePath: string,
//   options?: ImageKitOptions
// ): string {
//   const transformations = buildTransformations(options);
//
//   if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
//     return processFullUrl(imagePath, transformations);
//   }
//
//   return buildLocalPathUrl(imagePath, transformations);
// }

// /**
//  * Helper function to get avatar URL with optimized size and quality
//  * @param avatar - Avatar image path or URL
//  * @param size - Avatar size in pixels (default: 40, will be doubled for retina)
//  * @returns Optimized ImageKit URL for avatar
//  */
// export function getAvatarUrl(avatar: string, size = 40): string {
//   // Double the size for retina displays, use higher quality for avatars
//   const retinaSize = size * 2;
//   return getImageKitUrl(avatar, {
//     width: retinaSize,
//     height: retinaSize,
//     quality: 85, // Higher quality for faces
//     format: "auto",
//   });
// }

// Helper function to get team member data (people without testimonials or all people)
export function getTeamMembers(
  count = 4,
  includeTestimonials = false
): Person[] {
  if (includeTestimonials) {
    return peopleData.slice(0, count);
  }
  // Return people who don't have testimonials for team display
  return peopleData
    .filter((person) => !(person.stars && person.review))
    .slice(0, count);
}

// Helper function to get testimonials data
export function getTestimonials(count = 4): Person[] {
  return testimonialsData.slice(0, count);
}

// Helper function to get all people data
export function getAllPeople(): Person[] {
  return peopleData;
}

// Helper function to get people by role
// export function getPeopleByRole(role: string): Person[] {
//   return peopleData.filter((person) =>
//     person.role.toLowerCase().includes(role.toLowerCase())
//   );
// }

// Helper function to get people with testimonials
export function getPeopleWithTestimonials(): Person[] {
  return testimonialsData;
}
