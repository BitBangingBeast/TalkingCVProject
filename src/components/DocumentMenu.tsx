import { DropdownMenu } from './ui'

interface DocumentMenuProps {
  label: string
  openLabel?: string
  previewUrl: string
  downloadUrl: string
  downloadLabel?: string
  className?: string
}

export function DocumentMenu({
  label,
  openLabel,
  previewUrl,
  downloadUrl,
  downloadLabel = 'Download',
  className,
}: DocumentMenuProps) {
  return (
    <DropdownMenu
      label={label}
      openLabel={openLabel}
      onPrimary={() =>
        window.open(previewUrl, '_blank', 'noopener,noreferrer')
      }
      items={[{ label: downloadLabel, href: downloadUrl, download: true }]}
      className={className}
    />
  )
}
