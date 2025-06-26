// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const interRegular = fetch(
  new URL('../../../public/static/fonts/Inter-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const interBold = fetch(
  new URL('../../../public/static/fonts/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Factlink - Decentralized Optimistic Oracle for Solana'
    const summary = searchParams.get('summary') || 'Factlink is an optimistic oracle that trustlessly records any verifiable data on the Solana blockchain.'
    const customImage = searchParams.get('image')

    const [interRegularFont, interBoldFont] = await Promise.all([
      interRegular,
      interBold,
    ])

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2px, transparent 0)',
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Main Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              maxWidth: '1000px',
              padding: '40px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Logo/Brand Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                }}
              >
                <span style={{ fontSize: '32px', color: 'white' }}>⚡</span>
              </div>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Inter',
                }}
              >
                Factlink
              </span>
            </div>

            {/* Custom Image Section (if provided) */}
            {customImage && (
              <div
                style={{
                  width: '200px',
                  height: '120px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '30px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <img
                  src={customImage}
                  alt="Blog post image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 50 ? '42px' : '52px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                lineHeight: '1.2',
                marginBottom: '20px',
                fontFamily: 'Inter',
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>

            {/* Summary */}
            <p
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                lineHeight: '1.4',
                fontFamily: 'Inter',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              {summary.length > 150 ? summary.substring(0, 150) + '...' : summary}
            </p>

            {/* Bottom Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                padding: '12px 24px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '24px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  color: '#3b82f6',
                  fontFamily: 'Inter',
                  fontWeight: '600',
                }}
              >
                Decentralized Oracle for Solana
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interRegularFont,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: interBoldFont,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}