export interface StatsPlayer{
  StatID: number;
  TeamID: number;
  PlayerID: number;
  Team: string,
  Minutes: number;
  Seconds:number;
  Points: number;
  TwoPointersMade: number;
  TwoPointersAttempted: number;
  TwoPointersPercentage: number;
  ThreePointersMade: number;
  ThreePointersAttempted: number;
  ThreePointersPercentage: number;
  FreeThrowsMade: number;
  FreeThrowsAttempted: number;
  FreeThrowsPercentage: number;
  OffensiveRebounds: number;
  DefensiveRebounds: number;
  Rebounds: number;
  OffensiveReboundsPercentage: number;
  DefensiveReboundsPercentage: number;
  TotalReboundsPercentage: number;
  Assists: number;
  Steals: number;
  BlockedShots: number;
  Turnovers: number;
  PersonalFouls: number;
  TrueShootingAttempts: number;
  TrueShootingPercentage: number;
  PlayerEfficiencyRating: number;
  AssistsPercentage: number;
  StealsPercentage: number;
  BlocksPercentage: number;
}
