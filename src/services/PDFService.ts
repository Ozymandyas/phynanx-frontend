import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const createPDFAPIKey = async (apiKey: string) => {
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()

  const { width, height } = page.getSize()

  const fontSize = 10

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.setFont(helveticaFont)
  console.log(width, height)

  page.moveTo(120, 760)
  page.drawText('Your Phynanx API Key', { size: 36 })

  page.moveDown(50)
  page.moveLeft(62)
  page.drawText(
    `You must keep it secret and you should hide it when making API calls. \nIf you lose your API Key or if you suspect somebody has had access to it, \nyou can generate a new one but it will delete the previous one.`,
    { size: 15, color: rgb(1, 0, 0) }
  )

  page.drawText(`api_key=${apiKey}`, {
    x: 85,
    y: 600,
    font: timesRomanFont,
    size: 12,
    lineHeight: 24,
    opacity: 1,
  })
  // page.drawText(`api_key=${apiKey}`, {
  //   x: 50,
  //   y: height - 4 * fontSize,
  //   size: fontSize,
  //   font: timesRomanFont,
  //   color: rgb(0, 0.53, 0.71),
  // })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
