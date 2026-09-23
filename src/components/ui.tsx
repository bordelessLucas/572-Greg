import type { LucideIcon } from 'lucide-react'
import { Check, ChevronDown, Loader2, Search, X } from 'lucide-react'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  iconOnly?: boolean
  loading?: boolean
}

export function Button({
  variant = 'primary',
  iconLeft: IconLeft,
  iconRight: IconRight,
  iconOnly = false,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = ['button', `button--${variant}`, iconOnly ? 'button--icon' : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="button__spinner" size={16} /> : null}
      {!loading && IconLeft ? <IconLeft size={16} aria-hidden="true" /> : null}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      {!loading && IconRight ? <IconRight size={16} aria-hidden="true" /> : null}
    </button>
  )
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: LucideIcon
  helperText?: string
  error?: string
}

export function TextInput({
  label,
  icon: Icon,
  helperText,
  error,
  id,
  className,
  ...props
}: TextInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  const helpId = `${inputId}-help`

  return (
    <label className={['field', className ?? ''].filter(Boolean).join(' ')} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <span className={['field__control', error ? 'field__control--error' : ''].filter(Boolean).join(' ')}>
        {Icon ? <Icon size={16} aria-hidden="true" /> : null}
        <input id={inputId} aria-describedby={helperText || error ? helpId : undefined} {...props} />
      </span>
      {error ? (
        <span className="field__message field__message--error" id={helpId}>
          {error}
        </span>
      ) : helperText ? (
        <span className="field__message" id={helpId}>
          {helperText}
        </span>
      ) : null}
    </label>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<{ label: string; value: string }>
}

export function SelectField({ label, options, id, className, ...props }: SelectFieldProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <label className={['field', className ?? ''].filter(Boolean).join(' ')} htmlFor={selectId}>
      <span className="field__label">{label}</span>
      <span className="field__control field__control--select">
        <select id={selectId} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} aria-hidden="true" />
      </span>
    </label>
  )
}

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function SearchField({ label = 'Buscar', className, ...props }: SearchFieldProps) {
  return (
    <label className={['search-field', className ?? ''].filter(Boolean).join(' ')}>
      <Search size={16} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input type="search" {...props} />
      <kbd>⌘ K</kbd>
    </label>
  )
}

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  variant: 'pageTitle' | 'sectionTitle' | 'title' | 'body' | 'secondary' | 'caption'
  children: ReactNode
}

export function Typography({ as: Element = 'p', variant, children, className, ...props }: TypographyProps) {
  return (
    <Element className={['text', `text--${variant}`, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </Element>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <section className={['card', className ?? ''].filter(Boolean).join(' ')}>{children}</section>
}

type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

interface SegmentedControlProps<TValue extends string> {
  label: string
  value: TValue
  options: Array<{ label: string; value: TValue }>
  onChange: (value: TValue) => void
}

export function SegmentedControl<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<TValue>) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          className="segmented__item"
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

interface StatusCheckboxProps {
  checked?: boolean
  label: string
}

export function StatusCheckbox({ checked = false, label }: StatusCheckboxProps) {
  return (
    <span className={['status-check', checked ? 'status-check--checked' : ''].filter(Boolean).join(' ')}>
      <span aria-hidden="true">{checked ? <Check size={12} /> : null}</span>
      {label}
    </span>
  )
}

interface TableColumn<TRow> {
  key: string
  header: ReactNode
  align?: 'left' | 'right'
  render: (row: TRow) => ReactNode
}

interface TableProps<TRow> {
  columns: Array<TableColumn<TRow>>
  rows: TRow[]
  getRowKey: (row: TRow) => string
  emptyTitle: string
  emptyDescription: string
}

export function Table<TRow>({ columns, rows, getRowKey, emptyTitle, emptyDescription }: TableProps<TRow>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th className={column.align === 'right' ? 'numeric' : undefined} key={column.key}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td className={column.align === 'right' ? 'numeric' : undefined} key={column.key}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface DropdownMenuItem {
  label: string
  tone?: 'default' | 'danger'
  onSelect?: () => void
}

interface DropdownMenuProps {
  label: string
  items: DropdownMenuItem[]
}

export function DropdownMenu({ label, items }: DropdownMenuProps) {
  return (
    <details className="dropdown-menu">
      <summary aria-label={label}>
        <span className="dropdown-menu__dot" />
        <span className="dropdown-menu__dot" />
        <span className="dropdown-menu__dot" />
      </summary>
      <div className="dropdown-menu__content" role="menu">
        {items.map((item) => (
          <button
            className="dropdown-menu__item"
            data-tone={item.tone}
            key={item.label}
            onClick={item.onSelect}
            role="menuitem"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </details>
  )
}

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__mark" aria-hidden="true" />
      <Typography as="h3" variant="title">
        {title}
      </Typography>
      <Typography variant="caption">{description}</Typography>
      {action}
    </div>
  )
}

interface SkeletonProps {
  lines?: number
}

export function Skeleton({ lines = 3 }: SkeletonProps) {
  return (
    <div className="skeleton" aria-label="Carregando">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <Typography as="h2" variant="sectionTitle" className="modal__title">
            {title}
          </Typography>
          <Button variant="ghost" iconLeft={X} iconOnly onClick={onClose}>
            Fechar modal
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

interface DrawerProps {
  children: ReactNode
  title: string
}

export function Drawer({ children, title }: DrawerProps) {
  return (
    <aside className="drawer" aria-labelledby="drawer-title">
      <Typography as="h2" variant="sectionTitle" className="drawer__title">
        {title}
      </Typography>
      {children}
    </aside>
  )
}
