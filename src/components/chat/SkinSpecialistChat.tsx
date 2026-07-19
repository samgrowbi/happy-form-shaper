import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import specialistAvatar from "@/assets/specialist-avatar.jpg";
import { getTreatmentBySlug } from "@/config/treatmentRegistry";
import type { ChatIntakeField } from "@/config/treatments";
import { DEFAULT_ACUITY_TIMEZONE } from "@/config/acuity";
import { BRAND_NAME } from "@/config/brand";

const SESSION_KEY = "pearl_chat_session_id";
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/skin-specialist-chat`;

const DEFAULT_QUICK_REPLIES = [
  "Non-Surgical Face & Neck Lift",
  "Body Cavitation Fat Reduction",
  "I have a question",
];

const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text:
        `Hi, I'm Sofia one of the skin specialists at the ${BRAND_NAME} clinic. I'm here to help you find the right treatment and book your spot, right here in this chat.\n\nWhat's bothering you most lately?`,
    },
  ],
};

// Meta Pixel is loaded from index.html; fbq is declared on Window in src/vite-env.d.ts.

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

type DbMessage = {
  id: string;
  role: string;
  parts: unknown;
  created_at: string;
};

export default function SkinSpecialistChat() {
  const [open, setOpen] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([
    WELCOME_MESSAGE,
  ]);
  const sessionId = useMemo(() => getOrCreateSessionId(), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("chat-history", {
          headers: { "x-session-id": sessionId },
          body: { sessionId },
        });
        if (cancelled) return;
        if (error) {
          setBootstrapped(true);
          return;
        }
        const msgs = (data?.messages ?? []) as DbMessage[];
        if (msgs.length > 0) {
          const ui: UIMessage[] = (msgs as DbMessage[]).map((m) => ({
            id: m.id,
            role: m.role as UIMessage["role"],
            parts: Array.isArray(m.parts)
              ? (m.parts as UIMessage["parts"])
              : ([{ type: "text", text: String(m.parts ?? "") }] as UIMessage["parts"]),
          }));
          setInitialMessages([WELCOME_MESSAGE, ...ui]);
        }
        setBootstrapped(true);
      } catch {
        if (!cancelled) setBootstrapped(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (!bootstrapped) {
    return <FloatingBubble onClick={() => setOpen(true)} hidden />;
  }

  return (
    <>
      {!open && <FloatingBubble onClick={() => setOpen(true)} />}
      {open && (
        <ChatWindow
          key={sessionId}
          sessionId={sessionId}
          initialMessages={initialMessages}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function FloatingBubble({
  onClick,
  hidden,
}: {
  onClick: () => void;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <button
      onClick={onClick}
      aria-label="Chat with Sofia, our skin specialist"
      className="fixed z-[60] bottom-24 right-5 md:bottom-6 md:right-6 group flex items-center gap-3 rounded-full bg-white border border-pink-200 shadow-2xl transition-all hover:scale-105 hover:shadow-pink-200/60 pl-1.5 pr-4 py-1.5 md:py-2"
    >
      <span className="relative h-12 w-12 md:h-14 md:w-14 shrink-0">
        <img
          src={specialistAvatar}
          alt="Sofia, skin specialist"
          width={112}
          height={112}
          loading="lazy"
          className="h-full w-full rounded-full object-cover ring-2 ring-pink-100"
        />
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
      </span>
      <span className="hidden md:flex flex-col items-start text-left leading-tight">
        <span className="text-[13px] font-semibold text-gray-900">Chat with Sofia</span>
        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online now
        </span>
      </span>
    </button>
  );
}

type FormSubmissionPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  intakeAnswers: Record<string, string | string[]>;
  datetime: string;
  treatmentSlug: string;
};

function ChatWindow({
  sessionId,
  initialMessages,
  onClose,
}: {
  sessionId: string;
  initialMessages: UIMessage[];
  onClose: () => void;
}) {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: ENDPOINT,
        headers: {
          "x-session-id": sessionId,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
      }),
    [sessionId],
  );

  const { messages, sendMessage, status, error } = useChat({
    id: sessionId,
    messages: initialMessages,
    transport,
  });

  const [input, setInput] = useState("");
  const [submittedForms, setSubmittedForms] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const onSubmit = async (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    setInput("");
    await sendMessage({ text: value });
  };

  const handleFormSubmit = async (partId: string, payload: FormSubmissionPayload) => {
    setSubmittedForms((prev) => new Set(prev).add(partId));
    await sendMessage({
      text: `[BOOKING_FORM_SUBMISSION]${JSON.stringify(payload)}`,
    });
  };

  // Latest suggested quick replies from Sofia (from the last assistant message).
  const suggestedReplies = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role !== "assistant") continue;
      const part = [...m.parts].reverse().find(
        (p) => p.type === "tool-suggest_quick_replies",
      ) as { output?: { replies?: string[] } } | undefined;
      if (part?.output?.replies?.length) return part.output.replies;
      break;
    }
    return null;
  }, [messages]);

  const showDefaultQuickReplies = messages.length <= 1 && !isLoading;
  const activeQuickReplies = suggestedReplies ?? (showDefaultQuickReplies ? DEFAULT_QUICK_REPLIES : null);

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-[70] md:w-[400px] md:h-[640px] md:max-h-[85vh] flex flex-col bg-white md:rounded-3xl shadow-2xl overflow-hidden border border-pink-100">
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
        <div className="relative h-11 w-11 shrink-0">
          <img
            src={specialistAvatar}
            alt="Sofia"
            width={88}
            height={88}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/30"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-pink-500" />
        </div>
        <div className="flex-1 min-w-0 leading-tight">
          <div className="font-medium text-[15px]">Sofia · Skin Specialist</div>
          <div className="text-[11px] opacity-90 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online now · {BRAND_NAME}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="p-2 rounded-full hover:bg-white/15 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-pink-50/40"
      >
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            submittedForms={submittedForms}
            onFormSubmit={handleFormSubmit}
          />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="text-xs text-red-600 px-3 py-2 bg-red-50 rounded-lg">
            Sorry, something went wrong. Please try again in a moment.
          </div>
        )}
      </div>

      {activeQuickReplies && !isLoading && (
        <div className="px-3 pt-2 pb-1 flex flex-wrap gap-2 border-t border-pink-100 bg-white/70">
          {activeQuickReplies.map((q) => (
            <button
              key={q}
              onClick={() => onSubmit(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-white border border-pink-200 text-pink-700 hover:bg-pink-100 transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(input);
        }}
        className="border-t border-pink-100 bg-white p-3 flex items-end gap-2"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(input);
            }
          }}
          rows={1}
          placeholder="Type your message…"
          disabled={isLoading}
          className="flex-1 resize-none max-h-32 rounded-2xl border border-pink-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="h-10 w-10 shrink-0 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function MessageBubble({
  message,
  submittedForms,
  onFormSubmit,
}: {
  message: UIMessage;
  submittedForms: Set<string>;
  onFormSubmit: (partId: string, payload: FormSubmissionPayload) => void;
}) {
  const isUser = message.role === "user";
  const rawText = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();
  // Hide the raw [BOOKING_FORM_SUBMISSION] payload from the visible transcript.
  const hideText = isUser && rawText.startsWith("[BOOKING_FORM_SUBMISSION]");
  const text = hideText ? "" : rawText;
  const toolParts = message.parts.filter((p) =>
    typeof p.type === "string" && p.type.startsWith("tool-"),
  );

  if (!text && toolParts.length === 0 && !hideText) return null;
  if (hideText && toolParts.length === 0) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] text-sm leading-relaxed bg-pink-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md italic opacity-80">
          (booking details submitted)
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] text-sm leading-relaxed",
          isUser
            ? "bg-pink-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md"
            : "text-gray-800",
        )}
      >
        {!isUser && text && (
          <div className="px-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-pink-700">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-600 underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        )}
        {isUser && text && <span className="whitespace-pre-wrap">{text}</span>}

        {toolParts.map((p, idx) => {
          const partId = `${message.id}-${idx}`;
          return (
            <ToolPartRender
              key={partId}
              part={p}
              partId={partId}
              submitted={submittedForms.has(partId)}
              onFormSubmit={onFormSubmit}
            />
          );
        })}
      </div>
    </div>
  );
}

function ToolPartRender({
  part,
  partId,
  submitted,
  onFormSubmit,
}: {
  part: UIMessage["parts"][number];
  partId: string;
  submitted: boolean;
  onFormSubmit: (partId: string, payload: FormSubmissionPayload) => void;
}) {
  const type = (part as { type?: string }).type ?? "";
  const state = (part as { state?: string }).state;

  if (type === "tool-request_booking_form") {
    const output = (part as {
      output?: { ready?: boolean; treatmentSlug?: string; datetime?: string };
    }).output;
    if (state === "output-available" && output?.ready && output.treatmentSlug && output.datetime) {
      return (
        <BookingFormCard
          treatmentSlug={output.treatmentSlug}
          datetime={output.datetime}
          submitted={submitted}
          onSubmit={(payload) => onFormSubmit(partId, payload)}
        />
      );
    }
    return null;
  }

  if (type === "tool-book_appointment") {
    const output = (part as {
      output?: {
        success?: boolean;
        error?: string;
        treatmentName?: string;
        datetime?: string;
        appointmentId?: number | string;
      };
    }).output;
    if (state === "output-available" && output?.success) {
      return <BookingSuccessCard output={output} />;
    }
    if (state === "output-available" && output && output.success === false && output.error) {
      return (
        <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          {output.error}
        </div>
      );
    }
  }

  return null;
}

function BookingSuccessCard({
  output,
}: {
  output: {
    treatmentName?: string;
    datetime?: string;
    appointmentId?: number | string;
  };
}) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const apptId = output.appointmentId ? String(output.appointmentId) : "";
    if (!apptId) return;
    const key = `pixel_schedule_sent_${apptId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // ignore storage errors
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq(
        "track",
        "Schedule",
        {
          content_name: output.treatmentName ?? "",
          content_category: "Booking",
          appointment_id: apptId,
          source: "sofia_chatbot",
        },
        { eventID: `schedule_${apptId}` },
      );
    }
  }, [output.appointmentId, output.treatmentName]);

  const dt = output.datetime ? new Date(output.datetime) : null;
  return (
    <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
        <CheckCircle2 className="h-5 w-5" />
        You're booked
      </div>
      <div className="mt-2 text-sm text-gray-700">
        <div className="font-medium">{output.treatmentName}</div>
        {dt && (
          <div className="text-xs text-gray-600 mt-0.5">
            {dt.toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZone: DEFAULT_ACUITY_TIMEZONE,
            })}{" "}
            CT
          </div>
        )}
        <div className="text-[11px] text-gray-500 mt-2">
          A confirmation is on its way to your email and phone.
        </div>
      </div>
    </div>
  );
}

// ---------- Dynamic booking form ----------

function BookingFormCard({
  treatmentSlug,
  datetime,
  submitted,
  onSubmit,
}: {
  treatmentSlug: string;
  datetime: string;
  submitted: boolean;
  onSubmit: (payload: FormSubmissionPayload) => void;
}) {
  const treatment = getTreatmentBySlug(treatmentSlug);
  const intakeFields: ChatIntakeField[] = treatment.intakeFields ?? [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setAnswer = (id: number, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [String(id)]: value }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.firstName = "Required";
    if (!lastName.trim()) next.lastName = "Required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email";
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) next.phone = "Enter a valid phone";

    for (const f of intakeFields) {
      if (!f.required) continue;
      const v = answers[String(f.acuityFieldId)];
      if (Array.isArray(v)) {
        if (v.length === 0) next[String(f.acuityFieldId)] = "Required";
      } else if (!v || !String(v).trim()) {
        next[String(f.acuityFieldId)] = "Required";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      intakeAnswers: answers,
      datetime,
      treatmentSlug,
    });
  };

  const dt = new Date(datetime);
  const dtLabel = dt.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: DEFAULT_ACUITY_TIMEZONE,
  });

  if (submitted) {
    return (
      <div className="mt-3 rounded-2xl border border-pink-200 bg-white p-3 text-xs text-gray-600">
        Details submitted, hold on a second… 💕
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-pink-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <div className="text-sm font-semibold text-gray-900">{treatment.label}</div>
        <div className="text-xs text-gray-500">{dtLabel} CT</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <TextField
          label="First name"
          value={firstName}
          onChange={setFirstName}
          error={errors.firstName}
        />
        <TextField
          label="Last name"
          value={lastName}
          onChange={setLastName}
          error={errors.lastName}
        />
      </div>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <TextField
        label="Phone"
        type="tel"
        value={phone}
        onChange={setPhone}
        error={errors.phone}
      />

      <div className="mt-3 space-y-3">
        {intakeFields.map((f) => (
          <IntakeField
            key={f.acuityFieldId}
            field={f}
            value={answers[String(f.acuityFieldId)]}
            onChange={(v) => setAnswer(f.acuityFieldId, v)}
            error={errors[String(f.acuityFieldId)]}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 w-full h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition"
      >
        Confirm my booking
      </button>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block mt-2">
      <span className="block text-[11px] font-medium text-gray-600 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-9 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300",
          error ? "border-red-300" : "border-pink-200",
        )}
      />
      {error && <span className="block text-[10px] text-red-600 mt-0.5">{error}</span>}
    </label>
  );
}

function IntakeField({
  field,
  value,
  onChange,
  error,
}: {
  field: ChatIntakeField;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  error?: string;
}) {
  const label = (
    <div className="text-[12px] font-medium text-gray-800 mb-1">
      {field.label}
      {field.required && <span className="text-pink-600"> *</span>}
    </div>
  );

  if (field.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (opt: string) => {
      if (selected.includes(opt)) {
        onChange(selected.filter((o) => o !== opt));
      } else {
        onChange([...selected, opt]);
      }
    };
    return (
      <div>
        {label}
        {field.helpText && (
          <div className="text-[11px] text-gray-500 mb-2">{field.helpText}</div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {field.options?.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border transition",
                  active
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  if (field.type === "radio") {
    const current = typeof value === "string" ? value : "";
    return (
      <div>
        {label}
        <div className="flex flex-wrap gap-1.5">
          {field.options?.map((opt) => {
            const active = current === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-full border transition",
                  active
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  if (field.type === "yesno") {
    const current = typeof value === "string" ? value : "";
    return (
      <div>
        {label}
        {field.helpText && (
          <div className="text-[11px] text-gray-500 mb-1">{field.helpText}</div>
        )}
        <div className="flex gap-1.5">
          {["Yes", "No"].map((opt) => {
            const active = current === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange(opt)}
                className={cn(
                  "text-[11px] px-3 py-1 rounded-full border transition",
                  active
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50",
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  if (field.type === "select") {
    const current = typeof value === "string" ? value : "";
    return (
      <div>
        {label}
        <select
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full h-9 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300",
            error ? "border-red-300" : "border-pink-200",
          )}
        >
          <option value="">Select…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  if (field.type === "textarea") {
    const current = typeof value === "string" ? value : "";
    return (
      <div>
        {label}
        <textarea
          value={current}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className={cn(
            "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300",
            error ? "border-red-300" : "border-pink-200",
          )}
        />
        {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
      </div>
    );
  }

  const current = typeof value === "string" ? value : "";
  return (
    <div>
      {label}
      <input
        type="text"
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-9 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300",
          error ? "border-red-300" : "border-pink-200",
        )}
      />
      {error && <div className="text-[10px] text-red-600 mt-1">{error}</div>}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Dot delay="0s" />
          <Dot delay="0.15s" />
          <Dot delay="0.3s" />
        </div>
        <span className="text-[12px] text-pink-600/80">Sofia is typing…</span>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-2 w-2 rounded-full bg-pink-400 animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
