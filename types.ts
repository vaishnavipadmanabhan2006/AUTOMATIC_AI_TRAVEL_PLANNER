
export interface BusDetail {
  type: string;
  timing: string;
  cost: number;
}

export interface TempleDetail {
  nameEn: string;
  nameTa: string;
  timingsEn: string;
  timingsTa: string;
  description: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  route: string;
  temples: TempleDetail[];
  bus: BusDetail;
  carbonSaved: number;
  festivalWarning?: string;
  budgetOptions: {
    ttdc: string;
    private: string;
  };
}

export interface ItineraryResponse {
  totalCarbonSaved: number;
  days: DayItinerary[];
}
