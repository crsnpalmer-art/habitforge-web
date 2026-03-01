"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const QUARTERS = ["Q1 (Jan–Mar)", "Q2 (Apr–Jun)", "Q3 (Jul–Sep)", "Q4 (Oct–Dec)"];

interface Plan {
  annual: string;
  quarters: string[];
  weeks: string[];
  dailyHabit: string;
}

export default function GoalPlannerClient() {
  const [annual, setAnnual] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [quarters, setQuarters] = useState(["", "", "", ""]);
  const [weeks, setWeeks] = useState(["", "", "", ""]);
  const [dailyHabit, setDailyHabit] = useState("");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  function handleAnnualNext() {
    if (!annual.trim()) return;
    trackEvent("tool_goal_planner_step", { step: 1 });
    setStep(2);
  }

  function handleQuartersNext() {
    trackEvent("tool_goal_planner_step", { step: 2 });
    setStep(3);
  }

  function handleWeeksNext() {
    trackEvent("tool_goal_planner_step", { step: 3 });
    setStep(4);
  }

  function handleFinish() {
    setPlan({ annual, quarters, weeks, dailyHabit });
    trackEvent("tool_goal_planner_complete");
  }

  function reset() {
    setAnnual("");
    setQuarters(["", "", "", ""]);
    setWeeks(["", "", "", ""]);
    setDailyHabit("");
    setPlan(null);
    setStep(1);
  }

  if (plan) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-10 rounded-3xl border border-violet-200 bg-white p-8">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500 mb-2">Your Plan</p>
          <h2 className="text-3xl font-black text-stone-900 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            {plan.annual}
          </h2>

          <div className="space-y-5">
            {QUARTERS.map((q, i) => (
              plan.quarters[i] && (
                <div key={i} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400 mb-1">{q}</p>
                  <p className="text-sm font-semibold text-stone-800">{plan.quarters[i]}</p>
                  {plan.weeks[i] && (
                    <p className="text-xs text-stone-500 mt-1">
                      <span className="font-medium">Weekly focus:</span> {plan.weeks[i]}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>

          {plan.dailyHabit && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 mb-1">Daily Non-Negotiable</p>
              <p className="text-sm font-semibold text-stone-800">{plan.dailyHabit}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="rounded-full px-6 py-3 text-sm font-semibold border border-stone-300 text-stone-700 hover:border-stone-500 transition-colors"
          >
            Start Over
          </button>
          <Link
            href="/#waitlist"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors text-center"
          >
            Track This in HabitForge →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-2">Interactive Tool</p>
        <h1 className="text-4xl font-black text-stone-900 mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          Annual Goal Planner
        </h1>
        <p className="text-stone-500 leading-relaxed">
          Break your big annual goal into quarterly milestones and weekly actions.
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-stone-800" : "bg-stone-200"}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <label className="block">
            <p className="font-semibold text-stone-800 mb-2">What is your #1 goal for this year?</p>
            <textarea
              value={annual}
              onChange={(e) => setAnnual(e.target.value)}
              placeholder="e.g. Run a half marathon, Pay off $15k of debt, Launch a side project…"
              rows={3}
              className="w-full rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 resize-none transition-colors"
            />
          </label>
          <button
            onClick={handleAnnualNext}
            disabled={!annual.trim()}
            className="rounded-full px-7 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 disabled:opacity-40 transition-colors"
          >
            Next: Quarterly Milestones →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-800 mb-2">
            Break <span className="text-violet-700">&ldquo;{annual}&rdquo;</span> into 4 quarterly milestones.
          </p>
          {QUARTERS.map((q, i) => (
            <label key={i} className="block">
              <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-1">{q}</p>
              <input
                type="text"
                value={quarters[i]}
                onChange={(e) => {
                  const next = [...quarters];
                  next[i] = e.target.value;
                  setQuarters(next);
                }}
                placeholder={`Milestone by end of ${q.split(" ")[0]}…`}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 transition-colors"
              />
            </label>
          ))}
          <button
            onClick={handleQuartersNext}
            className="rounded-full px-7 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
          >
            Next: Weekly Actions →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="font-semibold text-stone-800 mb-2">
            For each quarter, what&rsquo;s the key weekly action?
          </p>
          {QUARTERS.map((q, i) => (
            quarters[i] ? (
              <label key={i} className="block">
                <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-0.5">{q}</p>
                <p className="text-xs text-stone-500 mb-1">{quarters[i]}</p>
                <input
                  type="text"
                  value={weeks[i]}
                  onChange={(e) => {
                    const next = [...weeks];
                    next[i] = e.target.value;
                    setWeeks(next);
                  }}
                  placeholder="Weekly action or habit…"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 transition-colors"
                />
              </label>
            ) : null
          ))}
          <button
            onClick={handleWeeksNext}
            className="rounded-full px-7 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
          >
            Next: Daily Habit →
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <label className="block">
            <p className="font-semibold text-stone-800 mb-2">What&rsquo;s the one daily non-negotiable habit?</p>
            <input
              type="text"
              value={dailyHabit}
              onChange={(e) => setDailyHabit(e.target.value)}
              placeholder="e.g. 20-minute walk, review budget, meditate…"
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 outline-none focus:border-stone-400 transition-colors"
            />
          </label>
          <button
            onClick={handleFinish}
            className="rounded-full px-7 py-3 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-700 transition-colors"
          >
            Generate My Plan →
          </button>
        </div>
      )}
    </div>
  );
}
