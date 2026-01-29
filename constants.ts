
import { ItineraryResponse } from './types';

export const DEMO_ITINERARY: ItineraryResponse = {
  totalCarbonSaved: 15.6,
  days: [
    {
      day: 1,
      title: "The Silk City Spiritual Start",
      route: "Chennai → Kanchipuram",
      temples: [
        {
          nameEn: "Kanchi Kamakshi Amman Temple",
          nameTa: "காஞ்சி காமாட்சி அம்மன் கோவில்",
          timingsEn: "5:30 AM - 12:15 PM, 4:00 PM - 8:15 PM",
          timingsTa: "காலை 5:30 - நண்பகல் 12:15, மாலை 4:00 - இரவு 8:15",
          description: "One of the three main centers of Shakti worship in India."
        },
        {
          nameEn: "Varadharaja Perumal Temple",
          nameTa: "வரதராஜப் பெருமாள் கோவில்",
          timingsEn: "6:00 AM - 11:00 AM, 4:00 PM - 8:00 PM",
          timingsTa: "காலை 6:00 - 11:00, மாலை 4:00 - இரவு 8:00",
          description: "A huge temple complex dedicated to Lord Vishnu with a 100-pillared hall."
        }
      ],
      bus: {
        type: "SETC Ultra Deluxe",
        timing: "Every 15 mins from CMBT",
        cost: 145
      },
      carbonSaved: 5.2,
      budgetOptions: {
        ttdc: "TTDC Hotel Tamilnadu (₹1,500)",
        private: "Regency Kanchipuram (₹4,500)"
      }
    },
    {
      day: 2,
      title: "The Agni Lingam Journey",
      route: "Kanchipuram → Tiruvannamalai",
      temples: [
        {
          nameEn: "Arunachaleswarar Temple",
          nameTa: "அருணாசலேஸ்வரர் கோவில்",
          timingsEn: "5:00 AM - 12:30 PM, 3:30 PM - 9:30 PM",
          timingsTa: "காலை 5:00 - நண்பகல் 12:30, மாலை 3:30 - இரவு 9:30",
          description: "One of the Pancha Bhoota Stalams, representing Fire (Agni)."
        }
      ],
      bus: {
        type: "SETC AC Sleeper",
        timing: "Dep: 08:30 AM, Arr: 11:30 AM",
        cost: 320
      },
      carbonSaved: 4.8,
      festivalWarning: "Pournami (Full Moon) Girivalam - Expect heavy crowds.",
      budgetOptions: {
        ttdc: "TTDC Tiruvannamalai (₹1,200)",
        private: "Sparsa Resorts (₹6,000)"
      }
    },
    {
      day: 3,
      title: "The Cultural Capital",
      route: "Tiruvannamalai → Madurai",
      temples: [
        {
          nameEn: "Meenakshi Amman Temple",
          nameTa: "மதுரை மீனாட்சி அம்மன் கோவில்",
          timingsEn: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
          timingsTa: "காலை 5:00 - நண்பகல் 12:30, மாலை 4:00 - இரவு 9:30",
          description: "The historical heart of Madurai, known for its stunning architecture."
        }
      ],
      bus: {
        type: "SETC Multi-Axle AC",
        timing: "Dep: 10:00 PM (Overnight)",
        cost: 580
      },
      carbonSaved: 5.6,
      budgetOptions: {
        ttdc: "TTDC Madurai I (₹1,800)",
        private: "Heritage Madurai (₹8,000)"
      }
    }
  ]
};
