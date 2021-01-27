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
    sharedPlan: Array<Plan>
}

export type Plan = {
    planId: number,
    planName: string,
    placeImage: string,
    createAt: Date,
    userId: number,
    details: Array<any>
}

export type SharePlanResponseType = {
    success: boolean,
    msg: string,
    sharePlanId: number
}