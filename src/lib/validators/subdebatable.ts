import { z } from 'zod'

export const SubdebatableValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubdebatableSubscriptionValidator = z.object({
  subdebatableId: z.string(),
})

export type CreateSubdebatablePayload = z.infer<typeof SubdebatableValidator>
export type SubscribeToSubdebatablePayload = z.infer<
  typeof SubdebatableSubscriptionValidator
>