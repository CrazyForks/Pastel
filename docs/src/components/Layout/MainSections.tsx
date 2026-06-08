import { m } from 'motion/react'

import { Spring } from '../../constants/spring'
import { ColorExplorer } from '../ColorPalette/ColorExplorer'
import { ColorGrid } from '../ColorPalette/ColorGrid'
import { ContrastDemo } from '../ContrastDemo'
import { AlertExamples } from '../Examples/AlertExamples'
import { ButtonExamples } from '../Examples/ButtonExamples'
import { CardExamples } from '../Examples/CardExamples'
import { FormExamples } from '../Examples/FormExamples'
import { Container } from '../ui/Container'

export function MainSections() {
  return (
    <>
      {/* Color Palette Section */}
      <m.section
        className="py-16 sm:py-24 lg:py-32 border-t border-border"
        id="palette"
        initial={{ opacity: 0, y: 50 }}
        transition={Spring.smooth(0.8)}
        viewport={{ once: true, margin: '-100px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Container>
          <m.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.6, 0.2)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Color palette
            </h2>
            <p className="text-lg text-text-secondary">
              A complete set of colors for building beautiful interfaces.
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.8, 0.4)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <ColorGrid />
          </m.div>
        </Container>

        <m.div
          className="hidden xl:block px-8 max-w-[1440px] mx-auto my-32"
          initial={{ opacity: 0, y: 50 }}
          transition={Spring.smooth(0.8, 0.6)}
          viewport={{ once: true, margin: '-100px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl text-center sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Color explorer
          </h2>
          <p className="text-lg text-text-secondary text-center">
            Explore the color palette in detail.
          </p>
          <ColorExplorer />
        </m.div>
      </m.section>

      {/* Contrast Demo Section */}
      <m.section
        className="py-16 sm:py-24 lg:py-32 border-t border-border"
        id="contrast"
        initial={{ opacity: 0, y: 50 }}
        transition={Spring.smooth(0.8)}
        viewport={{ once: true, margin: '-100px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Container>
          <m.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.6, 0.2)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Contrast levels
            </h2>
            <p className="text-lg text-text-secondary">
              Explore how colors adapt to different contrast requirements for
              accessibility and visual preference.
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.8, 0.4)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <ContrastDemo />
          </m.div>
        </Container>
      </m.section>

      {/* Examples Section */}
      <m.section
        className="py-16 sm:py-24 lg:py-32 border-t border-border"
        id="examples"
        initial={{ opacity: 0, y: 50 }}
        transition={Spring.smooth(0.8)}
        viewport={{ once: true, margin: '-100px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Container>
          <m.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 30 }}
            transition={Spring.smooth(0.6, 0.2)}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Component examples
            </h2>
            <p className="text-lg text-text-secondary">
              See how Pastel colors work across different UI components.
            </p>
          </m.div>

          <div className="space-y-24">
            {[
              { title: 'Buttons', component: <ButtonExamples />, delay: 0.3 },
              { title: 'Cards', component: <CardExamples />, delay: 0.4 },
              { title: 'Forms', component: <FormExamples />, delay: 0.5 },
              { title: 'Alerts', component: <AlertExamples />, delay: 0.6 },
            ].map((section) => (
              <m.div
                initial={{ opacity: 0, y: 30 }}
                key={section.title}
                transition={Spring.smooth(0.8, section.delay)}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
                  {section.title}
                </h3>
                {section.component}
              </m.div>
            ))}
          </div>
        </Container>
      </m.section>
    </>
  )
}
