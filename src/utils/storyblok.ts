import { useStoryblokApi, type ISbStoryData } from '@storyblok/astro';

import type {
  ConfigStoryblok,
  FooterStoryblok,
  HeaderStoryblok,
  PricePerNightStoryblok,
} from '../types/component-types-sb';

interface Config {
  header: HeaderStoryblok;
  footer: FooterStoryblok;
  pricePerNight: PricePerNightStoryblok;
}

export const getConfig = async (): Promise<Config> => {
  const storyblokApi = useStoryblokApi();

  const configResult = await storyblokApi.get('cdn/stories/config', {
    version: 'draft',
    resolve_links: 'url',
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const configStoryblok: ConfigStoryblok | undefined = configResult.data?.story?.content;
  if (!configStoryblok) {
    throw new Error('Config not found');
  }

  const header = configStoryblok.sections.find((section) => {
    return section.component === 'header';
  });
  if (!header) {
    throw new Error('Header not found');
  }

  const footer = configStoryblok.sections.find((section) => {
    return section.component === 'footer';
  });
  if (!footer) {
    throw new Error('Footer not found');
  }

  const pricePerNight = configStoryblok.sections.find((section) => {
    return section.component === 'price-per-night';
  });
  if (!pricePerNight) {
    throw new Error('Price per night not found');
  }

  return { header, footer, pricePerNight };
};

export const getStory = async (slug = 'home'): Promise<ISbStoryData> => {
  const storyblokApi = useStoryblokApi();
  const result = await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const story: ISbStoryData | undefined = result.data?.story;
  if (!story) {
    throw new Error(`Story not found: ${slug}`);
  }

  return story;
};

export const getLinks = async (): Promise<{ params: { slug: string | undefined } }[]> => {
  const storyblokApi = useStoryblokApi();
  const links = await storyblokApi.getAll('cdn/links', { version: 'draft' });

  return links
    .filter((link) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return !link.is_folder;
    })
    .map((link: { slug: string }) => {
      return {
        params: {
          slug: link.slug === 'home' ? undefined : link.slug,
        },
      };
    });
};
