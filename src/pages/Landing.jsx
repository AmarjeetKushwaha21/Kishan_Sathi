import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiHeart, FiStar } from 'react-icons/fi';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import FeatureShowcase from '@/components/public/FeatureShowcase';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { HERO_STATS, STATS, STEPS, TESTIMONIALS, WHY_US } from '@/data/mock/landing';

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-primary-100/40 to-white pb-20 pt-28 sm:pt-36 dark:from-[#0c1322] dark:via-[#0f1a2c] dark:to-[#0a0f1e]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-300/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-accent-300/20 blur-3xl" />

      <div className="container-app relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-primary-700 shadow-soft"
          >
            <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] text-white">
              <FiStar />
            </span>
            India&apos;s smartest farming companion
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Grow More, Worry Less with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              AI on your farm
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-base text-gray-600 sm:text-lg"
          >
            From sowing to selling, Kishan Sathi gives you smart crop advice, live market prices and weather alerts — in your language.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/register" className="focus-ring w-full rounded-xl sm:w-auto">
              <Button size="lg" fullWidth className="sm:w-auto">
                Start Farming Smart
                <FiArrowRight aria-hidden="true" className="text-lg" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" fullWidth className="sm:w-auto">
                I already have an account
              </Button>
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/70 p-4 shadow-soft backdrop-blur">
                <dt className="order-2 text-[11px] font-medium text-gray-500">{stat.label}</dt>
                <dd className="font-display text-xl font-bold text-primary-700 sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          aria-hidden="true"
          className="mx-auto mt-14 max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary-200/60 bg-white p-2 shadow-card">
            <div className="flex h-64 items-end justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100/60 via-white to-accent-100/40 p-4 sm:h-80 dark:from-primary-900/40 dark:via-gray-900 dark:to-accent-900/30">
              <div className="h-1/4 w-16 animate-float rounded-t-xl bg-primary-300/70" style={{ animationDelay: '0s' }} />
              <div className="h-2/4 w-16 animate-float rounded-t-xl bg-primary-400/80" style={{ animationDelay: '0.3s' }} />
              <div className="h-3/4 w-16 animate-float rounded-t-xl bg-primary-500" style={{ animationDelay: '0.6s' }} />
              <div className="h-full w-16 animate-float rounded-t-xl bg-gradient-to-t from-primary-600 to-primary-400" style={{ animationDelay: '0.9s' }} />
            </div>
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-primary-700 shadow-soft backdrop-blur">
              🌱 Yield +32% this season
            </span>
            <span className="absolute bottom-6 right-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-accent-700 shadow-soft backdrop-blur">
              📈 Wheat ₹2,450/quintal
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-app">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Everything your farm needs, in one app"
            subtitle="Powerful tools designed for Indian farmers, from small holdings to large estates."
          />
        </Reveal>

        <FeatureShowcase />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="container-app">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Four simple steps to a smarter farm"
            subtitle="Get started in minutes — no technical knowledge needed."
          />
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, step, title, text }, index) => (
            <Reveal key={step} delay={index * 0.08}>
              <li className="relative h-full rounded-2xl border-2 border-primary-100 bg-primary-50/40 p-6">
                <span aria-hidden="true" className="absolute right-5 top-4 font-display text-4xl font-bold text-primary-100">
                  {step}
                </span>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl text-primary-600 shadow-soft">
                  <Icon />
                </span>
                <h3 className="font-display text-base font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="bg-gradient-to-r from-primary-700 to-primary-600 py-14">
      <div className="container-app">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl">{stat.value}</dd>
              <dt className="mt-1 text-sm text-primary-100/90">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-app grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div aria-hidden="true" className="rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 p-8 sm:p-10 dark:from-[#123624] dark:to-[#40300d]">
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-card sm:h-48 sm:w-48">
                <span className="font-display text-6xl sm:text-7xl" aria-hidden="true">🌾</span>
              </div>
              <p className="mt-8 text-center font-display text-lg font-semibold text-primary-800 dark:text-primary-200">
                Built with farmers, for farmers.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Kishan Sathi"
              title="Technology that respects the soil and the farmer"
              subtitle="We work with agronomists, KVKs and local cooperatives to make sure every recommendation is practical and affordable."
            />
            <ul className="mt-8 space-y-4">
              {WHY_US.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm text-primary-600">
                    <FiCheck aria-hidden="true" />
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/register" className="focus-ring mt-8 inline-block rounded-xl">
              <Button size="lg" rightIcon={FiArrowRight}>
                Join free today
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-app">
        <Reveal>
          <SectionHeading
            eyebrow="Success stories"
            title="Farmers trust us across India"
            subtitle="Real stories from real farms."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <Reveal key={t.name} delay={index * 0.08}>
              <Card variant="tinted" className="flex h-full flex-col">
                <div className="mb-3 flex gap-0.5 text-accent-400" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} aria-hidden="true" className="fill-current" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-primary-100 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-semibold text-white">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.village}</p>
                  </div>
                  <FiHeart className="ml-auto text-primary-300" aria-hidden="true" />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="container-app">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-6 py-14 text-center shadow-card sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
            <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to grow with AI by your side?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-primary-100">
              Join 50,000+ farmers already growing smarter. It&apos;s free to start.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/register" className="w-full focus-ring rounded-xl sm:w-auto">
                <Button size="lg" variant="accent" className="w-full sm:w-auto">
                  Create free account
                  <FiArrowRight aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/login" className="w-full focus-ring rounded-xl sm:w-auto">
                <Button size="lg" variant="ghost" className="w-full border border-white/30 text-white hover:bg-white/10 sm:w-auto">
                  Log in
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <StatsBand />
        <WhyUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}