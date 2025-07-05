"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ReviewCard = ({
  review,
}: {
  review: { username: string; description: string };
}) => (
  <div className="max-w-80  text-justify">
    <h3 className="font-bold mb-4">{review.username}</h3>
    <p>{review.description}</p>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: { username: string; description: string }[] = [
    {
      username: "John D.",
      description:
        "This invoice generator is a game-changer! I can easily print my invoices and send them directly to my clients' emails. It's incredibly efficient and saves me so much time.",
    },
    {
      username: "Sarah K.",
      description:
        "I love how user-friendly this tool is. Generating and sending invoices has never been easier. The interface is clean, and the process is straightforward. Highly recommend!",
    },
    {
      username: "Michael B.",
      description:
        "Fantastic tool! The ability to print invoices and email them from one place is exactly what I needed. It has streamlined my workflow and improved my productivity.",
    },
    {
      username: "Emily R.",
      description:
        "This invoice generator is simply amazing. It's quick, reliable, and the email feature is a huge plus. I can manage all my invoices without any hassle.",
    },
    {
      username: "David L.",
      description:
        "A must-have for any business owner. The invoice generator is intuitive and efficient. Printing and emailing invoices has never been this easy. Great job!",
    },
    {
      username: "Jessica M.",
      description:
        "I'm thoroughly impressed with this invoice generator. It's easy to use, and the ability to send invoices directly to clients' emails is a huge time-saver. Highly recommended!",
    },
    {
      username: "Chris T.",
      description:
        "This tool has made my invoicing process so much smoother. I can generate, print, and email invoices all in one place. It's a fantastic solution for any business.",
    },
    {
      username: "Laura P.",
      description:
        "The best invoice generator I've used so far. It's efficient, user-friendly, and the email feature is incredibly convenient. It has definitely improved my invoicing process.",
    },
    {
      username: "Mark S.",
      description:
        "I can't believe how easy it is to generate and send invoices with this tool. It's a lifesaver for my business. The ability to print and email invoices from one place is brilliant.",
    },
    {
      username: "Anna W.",
      description:
        "This invoice generator is top-notch. It's simple to use, and the email feature is a huge benefit. It has made managing my invoices so much easier.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % reviews.length);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  // Calculate the reviews to display based on the current index
  const visibleTestimonials = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];
  return (
    <main className="text-background flex flex-col justify-center items-center gap-4 bg-foreground min-h-screen">
      <h1 className="h1 text-white text-center">
        Your one stop solution For Generating Invoices
        <br />
        <span className="text-primary">
          for user and sending them to their email
        </span>
      </h1>
      <button
        onClick={() => router.push("/dashboard")}
        className="btn text-background font-bold bg-primary"
      >
        Go to Dashboard
      </button>

      <h2 className="h2 text-primary">What People Are Saying ?</h2>

      <div className="flex gap-4  items-center p-4">
        {visibleTestimonials.map((reviews, index) => (
          <ReviewCard key={index} review={reviews} />
        ))}
      </div>
    </main>
  );
}
