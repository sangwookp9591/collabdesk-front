import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

// 기존 아이콘
export const HomeIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z"
    />
  </svg>
);

export const DirectMessageIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.675 6.468a4.75 4.75 0 1 1 8.807 3.441.75.75 0 0 0-.067.489l.379 1.896-1.896-.38a.75.75 0 0 0-.489.068 5 5 0 0 1-.648.273.75.75 0 1 0 .478 1.422q.314-.105.611-.242l2.753.55a.75.75 0 0 0 .882-.882l-.55-2.753A6.25 6.25 0 1 0 6.23 6.064a.75.75 0 1 0 1.445.404M6.5 8.5a5 5 0 0 0-4.57 7.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414A5 5 0 1 0 6.5 8.5m-3.5 5a3.5 3.5 0 1 1 1.91 3.119.75.75 0 0 0-.49-.068l-1.214.243.243-1.215a.75.75 0 0 0-.068-.488A3.5 3.5 0 0 1 3 13.5"
    />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.5a8.5 8.5 0 1 0 3.859 16.075l3.714.904a.75.75 0 0 0 .906-.906l-.904-3.714A8.5 8.5 0 0 0 10 1.5"
    ></path>
  </svg>
);

export const EllipsisIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      d="M14.5 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-6.25 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10"
    />
  </svg>
);

// 새로 추가된 아이콘
export const ChannelIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.74 3.878a.75.75 0 1 0-1.48-.255L7.68 7H3.75a.75.75 0 0 0 0 1.5h3.67L6.472 14H2.75a.75.75 0 0 0 0 1.5h3.463l-.452 2.623a.75.75 0 0 0 1.478.255l.496-2.878h3.228l-.452 2.623a.75.75 0 0 0 1.478.255l.496-2.878h3.765a.75.75 0 0 0 0-1.5h-3.506l.948-5.5h3.558a.75.75 0 0 0 0-1.5h-3.3l.54-3.122a.75.75 0 0 0-1.48-.255L12.43 7H9.2zM11.221 14l.948-5.5H8.942L7.994 14z"
    />
  </svg>
);

export const NotificationIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.357 3.256c-.157.177-.31.504-.36 1.062l-.05.558-.55.11c-1.024.204-1.691.71-2.145 1.662-.485 1.016-.736 2.566-.752 4.857l-.002.307-.217.217-2.07 2.077c-.145.164-.193.293-.206.374a.3.3 0 0 0 .034.199c.069.12.304.321.804.321h4.665l.07.672c.034.327.17.668.4.915.214.232.536.413 1.036.413.486 0 .802-.178 1.013-.41.227-.247.362-.588.396-.916l.069-.674h4.663c.5 0 .735-.202.804-.321a.3.3 0 0 0 .034-.199c-.013-.08-.061-.21-.207-.374l-2.068-2.077-.216-.217-.002-.307c-.015-2.291-.265-3.841-.75-4.857-.455-.952-1.123-1.458-2.147-1.663l-.549-.11-.05-.557c-.052-.558-.204-.885-.36-1.062C10.503 3.1 10.31 3 10 3s-.505.1-.643.256"
    />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.75 3.25a.75.75 0 0 0-1.5 0v6H3.251L3.25 10v-.75a.75.75 0 0 0 0 1.5V10v.75h6v6a.75.75 0 0 0 1.5 0v-6h6a.75.75 0 0 0 0-1.5h-6z"
    />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m9.151 3.676.271-1.108a2.5 2.5 0 0 1 1.156 0l.271 1.108a2 2 0 0 0 3.022 1.252l.976-.592a2.5 2.5 0 0 1 .817.817l-.592.975a2 2 0 0 0 1.252 3.023l1.108.27c.09.38.09.777 0 1.157l-1.108.27a2 2 0 0 0-1.252 3.023l.592.975a2.5 2.5 0 0 1-.817.818l-.976-.592a2 2 0 0 0-3.022 1.251l-.271 1.109a2.5 2.5 0 0 1-1.156 0l-.27-1.108a2 2 0 0 0-3.023-1.252l-.975.592a2.5 2.5 0 0 1-.818-.818l.592-.975a2 2 0 0 0-1.252-3.022l-1.108-.271a2.5 2.5 0 0 1 0-1.156l1.108-.271a2 2 0 0 0 1.252-3.023l-.592-.975a2.5 2.5 0 0 1 .818-.817l.975.592A2 2 0 0 0 9.15 3.676m2.335-2.39a4 4 0 0 0-2.972 0 .75.75 0 0 0-.45.518l-.372 1.523-.004.018a.5.5 0 0 1-.758.314l-.016-.01-1.34-.813a.75.75 0 0 0-.685-.048 4 4 0 0 0-2.1 2.1.75.75 0 0 0 .047.685l.814 1.34.01.016a.5.5 0 0 1-.314.759l-.018.004-1.523.372a.75.75 0 0 0-.519.45 4 4 0 0 0 0 2.971.75.75 0 0 0 .519.45l1.523.373.018.004a.5.5 0 0 1 .314.758l-.01.016-.814 1.34a.75.75 0 0 0-.048.685 4 4 0 0 0 2.101 2.1.75.75 0 0 0 .685-.048l1.34-.813.016-.01a.5.5 0 0 1 .758.314l.004.018.372 1.523a.75.75 0 0 0 .45.518 4 4 0 0 0 2.972 0 .75.75 0 0 0 .45-.518l.372-1.523.004-.018a.5.5 0 0 1 .758-.314l.016.01 1.34.813a.75.75 0 0 0 .685.049 4 4 0 0 0 2.101-2.101.75.75 0 0 0-.048-.685l-.814-1.34-.01-.016a.5.5 0 0 1 .314-.758l.018-.004 1.523-.373a.75.75 0 0 0 .519-.45 4 4 0 0 0 0-2.97.75.75 0 0 0-.519-.45l-1.523-.373-.018-.004a.5.5 0 0 1-.314-.759l.01-.015.814-1.34a.75.75 0 0 0 .048-.685 4 4 0 0 0-2.101-2.101.75.75 0 0 0-.685.048l-1.34.814-.016.01a.5.5 0 0 1-.758-.315l-.004-.017-.372-1.524a.75.75 0 0 0-.45-.518M8 10a2 2 0 1 1 4 0 2 2 0 0 1-4 0m2-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7"
    />
  </svg>
);

export const ComposeIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 3.268a1 1 0 0 0-1.414 0l-.482.482 1.439 1.44.482-.483a1 1 0 0 0 0-1.414zM15.19 6.25l-1.44-1.44-5.068 5.069-.431 1.872 1.87-.432zm-.957-4.043a2.5 2.5 0 0 1 3.536 0l.025.025a2.5 2.5 0 0 1 0 3.536l-6.763 6.763a.75.75 0 0 1-.361.2l-3.25.75a.75.75 0 0 1-.9-.9l.75-3.25a.75.75 0 0 1 .2-.361zM5.25 4A2.25 2.25 0 0 0 3 6.25v8.5A2.25 2.25 0 0 0 5.25 17h8.5A2.25 2.25 0 0 0 16 14.75v-4.5a.75.75 0 0 1 1.5 0v4.5a3.75 3.75 0 0 1-3.75 3.75h-8.5a3.75 3.75 0 0 1-3.75-3.75v-8.5A3.75 3.75 0 0 1 5.25 2.5h4.5a.75.75 0 0 1 0 1.5z"
    />
  </svg>
);

export const HourglassIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.46 5.22A3.473 3.473 0 0 1 6.924 1.5h6.178a3.45 3.45 0 0 1 3.44 3.694 2.55 2.55 0 0 1-.638 1.511l-2.967 3.339a.25.25 0 0 0 .01.342l2.867 2.867c.428.429.688.997.731 1.602a3.403 3.403 0 0 1-3.394 3.645H6.876a3.43 3.43 0 0 1-3.42-3.672 2.54 2.54 0 0 1 .68-1.553l2.712-2.893a.25.25 0 0 0 .01-.331l-2.81-3.372A2.57 2.57 0 0 1 3.46 5.22M6.924 3c-1.145 0-2.05.971-1.968 2.113.016.223.102.435.245.606l2.81 3.372a1.75 1.75 0 0 1-.069 2.317L5.23 14.3c-.162.173-.26.397-.277.634A1.93 1.93 0 0 0 6.876 17h6.275a1.903 1.903 0 0 0 1.898-2.039 1.02 1.02 0 0 0-.296-.647l-2.867-2.867a1.75 1.75 0 0 1-.07-2.4l2.967-3.338c.154-.173.246-.392.262-.622A1.95 1.95 0 0 0 13.102 3zM13.5 15.65c0 .35-.887.35-3.5.35s-3.5 0-3.5-.35c0-.933 2.345-3.15 3.5-3.15 1.19 0 3.5 2.228 3.5 3.15m-1-9.025c0 .45-1.875 2.5-2.5 2.5s-2.5-2.1-2.5-2.5C7.5 6 8.125 6 10 6s2.5 0 2.5.625"
    ></path>
  </svg>
);

export const ArrowBottomIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06"
    ></path>
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.72 5.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 0 1-1.06-1.06L10.94 10 7.72 6.78a.75.75 0 0 1 0-1.06"
    ></path>
  </svg>
);

export const PageIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.25 1.5A3.75 3.75 0 0 0 1.5 5.25v9.5a3.75 3.75 0 0 0 3.75 3.75h5.736c.729 0 1.428-.29 1.944-.805l4.765-4.765a2.75 2.75 0 0 0 .805-1.944V5.25a3.75 3.75 0 0 0-3.75-3.75zm7 9.25a1.5 1.5 0 0 0-1.5 1.5v3.25a.75.75 0 0 0 1.5 0v-2.75a.5.5 0 0 1 .5-.5h2.75a.75.75 0 0 0 0-1.5zM5.5 5.85a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1-.75-.75m.75 2.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5z"
    ></path>
  </svg>
);

export const PrevIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.768 5.293a.75.75 0 0 0-1.036-1.086l-5.5 5.25a.75.75 0 0 0 0 1.085l5.5 5.25a.75.75 0 1 0 1.036-1.085L5.622 10.75H16.25a.75.75 0 0 0 0-1.5H5.622z"
    ></path>
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.268 15.793a.75.75 0 0 1-1.036-1.085l4.146-3.958H3.75a.75.75 0 0 1 0-1.5h10.628l-4.146-3.957a.75.75 0 0 1 1.036-1.086l5.5 5.25a.75.75 0 0 1 0 1.085z"
    ></path>
  </svg>
);

export const HelpIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15M1 10a9 9 0 1 1 18 0 9 9 0 0 1-18 0m7.883-2.648c-.23.195-.383.484-.383.898a.75.75 0 0 1-1.5 0c0-.836.333-1.547.91-2.04.563-.48 1.31-.71 2.09-.71.776 0 1.577.227 2.2.729.642.517 1.05 1.294 1.05 2.271 0 .827-.264 1.515-.807 2.001-.473.423-1.08.623-1.693.703V12h-1.5v-1c0-.709.566-1.211 1.18-1.269.507-.048.827-.18 1.013-.347.162-.145.307-.39.307-.884 0-.523-.203-.87-.492-1.104C10.951 7.148 10.502 7 10 7c-.497 0-.876.146-1.117.352M10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
    ></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 48, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3M1.5 9a7.5 7.5 0 1 1 13.307 4.746l3.473 3.474a.75.75 0 1 1-1.06 1.06l-3.473-3.473A7.5 7.5 0 0 1 1.5 9"
    ></path>
  </svg>
);
