'use client';

import NeumorphButton from '@/components/NeumorphButton';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export const ChaiIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    height="20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* steam */}
    <path d="M9 2.5c-.6.7-.6 1.5 0 2.2s.6 1.5 0 2.2" />
    <path d="M13 2.5c-.6.7-.6 1.5 0 2.2s.6 1.5 0 2.2" />
    {/* cutting-chai glass */}
    <path d="M5.5 9h11l-1.4 11a1.5 1.5 0 0 1-1.5 1.3H8.4a1.5 1.5 0 0 1-1.5-1.3L5.5 9Z" />
    {/* chai level */}
    <path d="M6.3 13.5h9.4l-.9 6.6a.8.8 0 0 1-.8.7H8a.8.8 0 0 1-.8-.7l-.9-6.6Z" fill="currentColor" fillOpacity="0.35" stroke="none" />
  </svg>
);

export const GitHubSponsorIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    height="20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z" />
  </svg>
);

export const BUY_ME_A_CHAI_URL = 'https://buymeachai.ezee.li/minianon';
export const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/minianon';

interface SponsorButtonProps {
  href?: string;
  tooltipText?: string;
  variant?: 'chai' | 'github';
}

export default function SponsorButton({
  variant = 'chai',
  href = variant === 'github' ? GITHUB_SPONSORS_URL : BUY_ME_A_CHAI_URL,
  tooltipText = variant === 'github' ? 'Sponsor me on GitHub' : 'Support my open source work',
}: SponsorButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild className="p-0 bg-transparent hover:bg-transparent">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="touch-manipulation"
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
          >
            <NeumorphButton className="px-4 sm:px-5 py-2.5">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white">
                {variant === 'github' ? (
                  <GitHubSponsorIcon className="translate-y-0 size-4 md:size-4.5 text-pink-500 transition-transform duration-300" />
                ) : (
                  <ChaiIcon className="translate-y-0 size-4.5 md:size-5 text-amber-600 dark:text-amber-400 transition-transform duration-300" />
                )}
                <span>{variant === 'github' ? 'Sponsor me on GitHub' : 'Buy me a chai'}</span>
              </div>
            </NeumorphButton>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">{tooltipText}</TooltipContent>
    </Tooltip>
  );
}

export function SponsorButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <SponsorButton variant="chai" />
      <SponsorButton variant="github" />
    </div>
  );
}
