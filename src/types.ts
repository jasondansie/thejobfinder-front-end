export interface IJob {
    _id: string;
    userId: string;
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
    recruiterEmail?: string;
    recruiterPhonenumber?: string;
    notes?: string;
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
    recruiterEmail?: string;
    recruiterPhonenumber?: string;
    recruiterPosition?: string;
    notes?: string;
    applied: boolean;
    userId: string;

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
    userId: string;
    name: string;
    email: string;
    givenName: string;
    familyName: string;
    picture: string;
}

export interface userState {
  users: {
    usersList: IUser[];
    appUser: IUser | null;
    isLoggedIn: boolean;
    jobs: IJob[];
  };
}