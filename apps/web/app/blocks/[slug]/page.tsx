import { notFound } from 'next/navigation'
import { getBlocksByCategory, getBlockCategoryMeta, blockCategories, type BlockCategory } from '@/lib/blocks-registry'
import { BlockPageClient } from './client'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return blockCategories.map((c) => ({ slug: c.id }))
}

export default function BlockPage({ params }: Props) {
  const category = getBlockCategoryMeta(params.slug as BlockCategory)
  if (!category) notFound()
  const blocks = getBlocksByCategory(params.slug as BlockCategory)
  return <BlockPageClient category={category} blocks={blocks} />
}
