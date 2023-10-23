export class Careers{
    public jobId: string;
    public title: string;
    public location: string;
    public description: string;
    public requirements: string;
    public instructions: string;
    constructor(jobId: string, title:string, description: string, location: string,requirements: string, instructions: string){
        this.jobId = jobId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.requirements = requirements;
        this.instructions = instructions;
    }
}