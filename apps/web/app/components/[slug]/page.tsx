import { notFound } from 'next/navigation'
import {
  getInteractionsByCategory,
  getCategoryMeta,
  categories,
  type Category,
} from '@/lib/registry'
import { ComponentPageClient } from './client'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }))
}

export default function ComponentPage({ params }: Props) {
  const category = getCategoryMeta(params.slug as Category)
  if (!category) notFound()

  const interactions = getInteractionsByCategory(params.slug as Category)

  return <ComponentPageClient category={category} interactions={interactions} />
}
