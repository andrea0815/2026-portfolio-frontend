export function formatDate(date: string): string {
    const formatted = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
    })

    const [month, year] = formatted.split("/")

    return `${month}-${year}`
  }