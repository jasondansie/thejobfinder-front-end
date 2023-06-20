export interface IJob {
    _id: string;
    company: string;
    companyWebSite?: string;
    applicationLink: string;
    Position: string;
    jobDescription: string;
    dateApplied?: string;
    response?: string;
    reasonToWork?: string;
    recruiterName?: string;
    recruiterPosition?: string;
    applied: boolean;
  }

  export interface ISendJob {
    company: string;
    companyWebSite?: string;
    applicationLink: string;
    Position: string;
    jobDescription: string;
    dateApplied?: string;
    response?: string;
    reasonToWork?: string;
    recruiterName?: string;
    recruiterPosition?: string;
    applied: boolean;
  }

  export interface IJobShort {
    _id: string;
    company: string;
    Position: string;
    jobDescription: string;
    dateApplied?: string;
    response?: string;
  }

  export interface IUser {
    id: string;
    name: string;
    email: string;
    givenName: string;
    familyName: string;
    picture: string;
}