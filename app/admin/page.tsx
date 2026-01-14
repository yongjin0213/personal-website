import Link from 'next/link';

type ColorKey = 'blue' | 'red' | 'purple';

type AdminAction = {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: ColorKey;
  disabled?: boolean;
};

export default async function AdminPage() {
  const adminActions: AdminAction[] = [
    {
      title: 'Write a Blog',
      description: 'Create and publish new blog posts',
      href: '/admin/create-post',
      icon: '✍️',
      color: 'blue',
    },
    {
      title: 'Delete a Blog',
      description: 'Manage and remove existing posts',
      href: '/admin/delete-post',
      icon: '🗑️',
      color: 'red',
    },
    {
      title: 'Send Newsletter',
      description: 'Coming soon: Email subscribers',
      href: '#',
      icon: '📧',
      color: 'purple',
      disabled: true,
    },
  ];

  const colorClasses: Record<ColorKey, {
    bg: string;
    text: string;
    border: string;
    hover: string;
  }> = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400 hover:bg-blue-100',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      hover: 'hover:border-red-400 hover:bg-red-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      hover: 'hover:border-purple-400 hover:bg-purple-100',
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold text-[var(--green-dark)]">
          Admin Dashboard
        </h1>
        <p className="text-[color:rgba(31,45,31,0.6)]">
          Manage your blog posts and settings
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminActions.map((action) => {
          const colors = colorClasses[action.color];
          
          const card = (
            <div
              className={`group relative rounded-2xl border-2 p-6 transition-all ${
                action.disabled
                  ? 'cursor-not-allowed opacity-60'
                  : `cursor-pointer ${colors.hover}`
              } ${colors.border} ${colors.bg}`}
            >
              {/* Icon */}
              <div className="mb-4 text-4xl">
                {action.icon}
              </div>

              {/* Content */}
              <h2 className={`font-display text-xl font-semibold ${colors.text}`}>
                {action.title}
              </h2>
              <p className="mt-2 text-sm text-[color:rgba(31,45,31,0.6)]">
                {action.description}
              </p>

              {/* Arrow indicator */}
              {!action.disabled && (
                <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${colors.text} opacity-0 transition group-hover:opacity-100`}>
                  <span>Open</span>
                  <span>→</span>
                </div>
              )}

              {/* Coming soon badge */}
              {action.disabled && (
                <span className="absolute right-4 top-4 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                  Coming Soon
                </span>
              )}
            </div>
          );

          return action.disabled ? (
            <div key={action.title}>{card}</div>
          ) : (
            <Link key={action.title} href={action.href}>
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}