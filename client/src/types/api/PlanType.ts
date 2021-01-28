export type CreatePlanResponseType = {
    succees: boolean,
    msg: string,
    placeImage: string,
    planId: number
}

export type GetAllPlansResponseType = {
    success: boolean,
    msg: string,
    plans: Array<Plan>
    sharedPlans: Array<SharedPlan>
}

export type SharedPlan = {
    sharedPlanId: number,
    userId: number,
    plan: Plan
}

export type Plan = {
    planId: number,
    planName: string,
    placeImage: string,
    createAt: Date,
    userId: number,
    planOwner: string,
    details: Array<any>
}

export type SharePlanResponseType = {
    success: boolean,
    msg: string,
    sharePlanId: number
}