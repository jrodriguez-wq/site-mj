import { notFound } from "next/navigation";
import { ModelPageContent } from "@/components/models/model-page-content";
import { getModelDataWithImages } from "@/lib/models/model-data";
import { generatePropertyMetadata } from "@/lib/seo/metadata";
import { SEO_CONFIG } from "@/config/seo";
import type { Metadata } from "next";
import type { Community } from "@/types/model";

interface ModelPageProps {
  params: Promise<{
    model: string;
  }>;
  searchParams: Promise<{
    community?: string;
  }>;
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { model } = await params;
  const modelData = await getModelDataWithImages(model);

  if (!modelData) {
    return {
      title: `Model Not Found | ${SEO_CONFIG.siteName}`,
    };
  }

  const imageUrl = modelData.images[0]
    ? `${SEO_CONFIG.siteUrl}${modelData.images[0]}`
    : undefined;

  return generatePropertyMetadata(
    modelData.name,
    modelData.description,
    imageUrl,
    modelData.price
  );
}

export default async function ModelPage({ params, searchParams }: ModelPageProps) {
  const { model } = await params;
  const { community } = await searchParams;
  
  // Validar que community sea una ciudad válida
  const validCommunity: Community | undefined = 
    community === "labelle" || community === "lehigh-acres" 
      ? (community as Community) 
      : undefined;
  
  const modelData = await getModelDataWithImages(model, validCommunity);

  if (!modelData) {
    notFound();
  }

  return <ModelPageContent modelData={modelData} />;
}
