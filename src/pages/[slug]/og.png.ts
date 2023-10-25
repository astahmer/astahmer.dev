import { getCollection, type CollectionEntry } from 'astro:content'
import fs from 'fs'
import path from 'path'
import { ImageResponse } from '@vercel/og'
import { formatDate } from '@/utils/formatDate'

interface Props {
  params: { slug: string }
  props: { post: CollectionEntry<'articles'> }
}

export async function GET({ props }: Props) {
  const { post } = props

  // using custom font files
  const fontPath = path.resolve('./assets/Inter-Bold.ttf')
  const InterBold = fs.readFileSync(fontPath)

  const bgImage = fs.readFileSync(path.resolve('./assets/og-image-background.png'))
  const profilePic = fs.readFileSync(path.resolve('./assets/alex-profile-pic.png'))

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: 'div',
    props: {
      tw: 'flex w-full h-full flex relative',
      style: {
        fontFamily: 'Inter Bold',
        alignItems: 'flex-end',
      },
      children: [
        {
          type: 'div',
          props: {
            tw: 'flex w-full h-full top-[-70px] absolute',
            children: [
              {
                type: 'img',
                tw: 'flex-1 w-full h-full',
                props: {
                  styles: {
                    objectFit: 'cover',
                    objectPosition: 'center',
                  },
                  src: bgImage.buffer,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'ml-[40px] mb-[180px] flex flex-1 flex-col',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'mr-auto flex items-center mb-[40px]',
                  children: [
                    {
                      type: 'div',
                      props: {
                        tw: 'flex w-[100px] h-[100px]',
                        children: [
                          {
                            type: 'img',
                            tw: 'flex-1 w-full h-full',
                            props: {
                              styles: {
                                objectFit: 'cover',
                                objectPosition: 'center',
                              },
                              src: profilePic.buffer,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        tw: 'flex mx-[20px]',
                        children: ['Alexandre Stahmer'],
                        style: {
                          fontSize: '32px',
                          color: '#f0f9ff',
                        },
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '68px',
                    color: '#f0f9ff',
                  },
                  // children: "👋 Hey, I'm Alex, freelance web developer",
                  children: 'Freelance web developer ⚡',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            tw: 'flex w-[35%]',
          },
        },
        {
          type: 'div',
          props: {
            tw: 'absolute left-[40px] bottom-[40px] flex items-center',
            children: [
              {
                type: 'div',
                props: {
                  tw: 'text-2xl',
                  style: {
                    color: '#fefce8',
                  },
                  children: 'astahmer.dev',
                },
              },
            ],
          },
        },
      ],
    },
  }

  return new ImageResponse(html as any, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'Inter Bold',
        data: InterBold.buffer,
        style: 'normal',
      },
    ],
  })
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection('posts')
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }))
}
