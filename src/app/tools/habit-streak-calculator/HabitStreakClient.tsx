"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

function calcStreak(dailyProb: number, days: number) {
  // Probability of maintaining the streak for `days` straight
  return Math.pow(dailyProb / 100, days);
}

function formatPercent(n: number) {
  if (n >= 0.01) return `${(n * 100).toFixed(1)}%`;
  return `< 1%`;
}

const MILESTONES = [7, 14, 21, 30, 60, 90, 180, 365];

export default function HabitStreakClient() {
  const [dailyRate, setDailyRate] = useState(80);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const milestones = useMemo(() => {
    return MILESTONES.map((days) => ({
      days,
      prob: calcStreak(dailyRate, days),
    }));
  }, [dailyRate]);

  // Expected streak length = 1/(1 - p)
  const expectedStreak = useMemo(() => {
    const p = dailyRate / 100;
    if (p >= 1) return "∞";
    return Math.round(1 / (1 - p)).toString();
  }, [dailyRate]);

  function handleCalculate() {
    setCalculated(true);
    trackEvent("tool_streak_calculator_used", { daily_rate: dailyRate, current_streak: currentStreak });
  }

  const currentProbOfBreaking = useMemo(() => {
    if (!currentStreak) return null;
    const p = dailyRate / 100;
    return 1 - p; // prob of breaking today
  }, [dailyRate, currentStreak]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2">Interactive Tool</p>
        <h1 className="text-4xl font-black text-stone-900 mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Habit Streak Calculator
        </h1>
        <p className="text-stone-500 leading-relaxed">
          Enter your estimated daily follow-through rate to see the probability of reaching each streak milestone.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 mb-8 space-y-6">
        {/* Daily success rate slider */}
        <div>
          <label className="block font-semibold text-stone-800 mb-1">
            Daily follow-through rate:{" "}
            <span className="text-violet-700">{dailyRate}%</span>
          </label>
          <p className="text-xs text-stone-400 mb-3">
            Estimate how often you complete this habit on any given day.
          </p>
          <input
            type="range"
            min={50}
            max={99}
            step={1}
            value={dailyRate}
            onChange={(e) => {
              setDailyRate(Number(e.target.value));
              setCalculated(false);
            }}
            className="w-full accent-stone-800"
          />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>50% — Coin flip</span>
            <span>99% — Near-perfect</span>
          </div>
        </div>

        {/* Current streak (optional) */}
        <div>
          <label className="block font-semibold text-stone-800 mb-1">
            Current streak (days) <span className="text-stone-400 font-normal">— optional</span>
          </label>
          <input
            type="number"
            min={0}
            max={3650}
            value={currentStreak || ""}
            onChange={(e) => {
              setCurrentStreak(Number(e.target.value));
              setCalculated(false);
            }}
            placeholder="0"
            className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full rounded-full py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
        >
          Calculate →
        </button>
      </div>

      {calculated && (
        <>
          {/* Key insight */}
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 mb-6">
            <p className="text-xs font-bold tracking-widest uppercase text-violet-500 mb-2">Key Insight</p>
            <p className="text-stone-800 font-semibold">
              At {dailyRate}% consistency, your expected streak length is{" "}
              <span className="text-violet-700">{expectedStreak} days</span>.
            </p>
            {currentStreak > 0 && currentProbOfBreaking !== null && (
              <p className="text-sm text-stone-500 mt-2">
                Chance of breaking your current {currentStreak}-day streak today:{" "}
                <span className="font-semibold text-rose-600">{(currentProbOfBreaking * 100).toFixed(1)}%</span>
              </p>
            )}
          </div>

          {/* Milestone table */}
          <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden mb-8">
            <div className="px-5 py-3 border-b border-stone-100">
              <p className="text-xs font-bold tracking-widest uppercase text-stone-400">Streak Milestone Probabilities</p>
            </div>
            <div className="divide-y divide-stone-100">
              {milestones.map(({ days, prob }) => {
                const pct = prob * 100;
                const barColor =
                  pct > 50 ? "bg-emerald-400" : pct > 20 ? "bg-amber-400" : "bg-rose-400";
                return (
                  <div key={days} className="flex items-center gap-4 px-5 py-3">
                    <span className="w-16 text-sm font-semibold text-stone-700 flex-shrink-0">
                      {days} days
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-700`}
                        style={{ width: `${Math.max(pct, 1)}%` }}
                      />
                    </div>
                    <span className="w-14 text-right text-sm text-stone-600 flex-shrink-0">
                      {formatPercent(prob)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight copy */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-2">Why This Matters</p>
            <p className="text-sm text-stone-500 leading-relaxed">
              Small improvements to your daily rate have outsized effects over time. Moving from 80% to 90% consistency more than doubles your expected streak length — and makes a 90-day streak nearly 3× more likely.
              {" "}The system matters more than willpower. Build cues, reduce friction, and track daily.
            </p>
          </div>

          <Link
            href="/#waitlist"
            className="block w-full text-center rounded-full py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
          >
            Track your habits in HabitForge →
          </Link>
        </>
      )}
    </div>
  );
}
