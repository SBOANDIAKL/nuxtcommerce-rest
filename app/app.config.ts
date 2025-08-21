export default defineAppConfig({
  ui: {
    primary: 'red',
    gray: 'neutral',
    input: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-2xl border-2 border-transparent appearance-none',
          'bg-white/80 dark:bg-black/20 dark:border-white/20 shadow',
          'placeholder:text-neutral-400 text-black dark:text-white font-semibold',
          'focus-visible:outline-none focus-visible:border-black focus-visible:dark:border-white',
          'hover:border-black dark:hover:border-white',
          'transition-colors disabled:cursor-not-allowed disabled:opacity-75',
        ],
        leading: 'absolute inset-y-0 start-0 flex items-center',
        leadingIcon: 'shrink-0 text-dimmed',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailing: 'absolute inset-y-0 end-0 flex items-center',
        trailingIcon: 'shrink-0 text-dimmed',
      },
      variants: {
        buttonGroup: {
          horizontal: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
          },
          vertical: {
            root: 'group has-focus-visible:z-[1]',
            base: 'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none',
          },
        },
        size: {
          xs: {
            base: 'px-3 py-2 text-xs gap-1',
            leading: 'ps-2',
            trailing: 'pe-2',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
          },
          sm: {
            base: 'px-3.5 py-2.5 text-sm gap-1.5',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
          },
          md: {
            base: 'px-4 py-3 text-sm gap-2',
            leading: 'ps-2.5',
            trailing: 'pe-2.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
          },
          lg: {
            base: 'px-5 py-3.5 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
          },
          xl: {
            base: 'px-6 py-4 text-base gap-2',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-6',
          },
        },
        variant: {
          outline: 'text-highlighted bg-default',
          soft: 'text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50',
          subtle: 'text-highlighted bg-elevated',
          ghost: 'text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent',
          none: 'text-highlighted bg-transparent',
        },
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: '',
        },
        leading: {
          true: '',
        },
        trailing: {
          true: '',
        },
        loading: {
          true: '',
        },
        highlight: {
          true: '',
        },
        type: {
          file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'outline',
            'subtle',
          ],
          class: 'focus-visible:border-black dark:focus-visible:border-white',
        },
        {
          color: 'primary',
          highlight: true,
          class: '',
        },
        {
          color: 'neutral',
          variant: [
            'outline',
            'subtle',
          ],
          class: 'focus-visible:border-black dark:focus-visible:border-white',
        },
        {
          color: 'neutral',
          highlight: true,
          class: '',
        },
        {
          leading: true,
          size: 'xs',
          class: 'ps-7',
        },
        {
          leading: true,
          size: 'sm',
          class: 'ps-8',
        },
        {
          leading: true,
          size: 'md',
          class: 'ps-9',
        },
        {
          leading: true,
          size: 'lg',
          class: 'ps-10',
        },
        {
          leading: true,
          size: 'xl',
          class: 'ps-11',
        },
        {
          trailing: true,
          size: 'xs',
          class: 'pe-7',
        },
        {
          trailing: true,
          size: 'sm',
          class: 'pe-8',
        },
        {
          trailing: true,
          size: 'md',
          class: 'pe-9',
        },
        {
          trailing: true,
          size: 'lg',
          class: 'pe-10',
        },
        {
          trailing: true,
          size: 'xl',
          class: 'pe-11',
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: 'animate-spin',
          },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: 'animate-spin',
          },
        },
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'none',
      },
    },
  },
})
