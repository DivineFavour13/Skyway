import { jsPDF } from 'jspdf';
import type { DuffelOffer } from '@/types/duffel';
import { formatDateTime, formatDuration } from './utils';

type PassengerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  passport: string;
};

export function generateBoardingPass(
  offer: DuffelOffer,
  passenger: PassengerDetails,
  ref: string
) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [100, 210],
  });

  const slice = offer.slices[0];
  const firstSeg = slice?.segments[0];
  const lastSeg = slice?.segments[slice.segments.length - 1];
  if (!slice || !firstSeg || !lastSeg) return;

  const departure = formatDateTime(firstSeg.departing_at);
  const arrival = formatDateTime(lastSeg.arriving_at);
  const duration = formatDuration(slice.duration);
  const stops = slice.segments.length - 1;

  const W = 210;
  const H = 100;

  // Background
  doc.setFillColor(22, 18, 14);
  doc.rect(0, 0, W, H, 'F');

  // Left panel background
  doc.setFillColor(32, 26, 20);
  doc.rect(0, 0, 145, H, 'F');

  // Accent line
  doc.setFillColor(194, 152, 60);
  doc.rect(0, 0, 2, H, 'F');

  // Dashed divider
  doc.setDrawColor(60, 50, 40);
  doc.setLineDashPattern([2, 2], 0);
  doc.setLineWidth(0.3);
  doc.line(145, 8, 145, H - 8);

  // Tear notches
  doc.setFillColor(22, 18, 14);
  doc.circle(145, 0, 4, 'F');
  doc.circle(145, H, 4, 'F');

  // ── BRANDING ──
  doc.setTextColor(194, 152, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('* NEXTRIP', 10, 14);

  doc.setTextColor(120, 100, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('BOARDING PASS', 10, 19);

  // ── PASSENGER ──
  doc.setTextColor(120, 100, 80);
  doc.setFontSize(6);
  doc.text('PASSENGER NAME', 10, 30);
  doc.setTextColor(240, 230, 210);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    `${passenger.firstName.toUpperCase()} ${passenger.lastName.toUpperCase()}`,
    10,
    37
  );

  // ── ROUTE ──
  doc.setTextColor(194, 152, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(firstSeg.origin.iata_code, 10, 58);

  doc.setTextColor(120, 100, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text(firstSeg.origin.city?.name ?? firstSeg.origin.iata_code, 10, 63);

  doc.setTextColor(80, 65, 50);
  doc.setFontSize(12);
  doc.text('->', 38, 58);

  doc.setTextColor(194, 152, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(lastSeg.destination.iata_code, 48, 58);

  doc.setTextColor(120, 100, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text(lastSeg.destination.city?.name ?? lastSeg.destination.iata_code, 48, 63);

  // ── FLIGHT DETAILS ROW ──
  const detailY = 78;
  const fields = [
    { label: 'DATE',     value: departure.date },
    { label: 'DEPARTS',  value: departure.time },
    { label: 'ARRIVES',  value: arrival.time },
    { label: 'DURATION', value: duration },
    { label: 'STOPS',    value: stops === 0 ? 'NONSTOP' : String(stops) },
    { label: 'CLASS',    value: 'ECONOMY' },
  ];

  fields.forEach((field, i) => {
    const x = 10 + i * 22;
    doc.setTextColor(100, 82, 62);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(5);
    doc.text(field.label, x, detailY);
    doc.setTextColor(220, 205, 180);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(field.value, x, detailY + 5);
  });

  // ── AIRLINE ──
  doc.setTextColor(100, 82, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text('OPERATED BY', 10, 93);
  doc.setTextColor(180, 160, 130);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.text(offer.owner.name.toUpperCase(), 10, 97);

  // ── RIGHT PANEL ──
  doc.setTextColor(100, 82, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('BOOKING REF', 152, 14);

  doc.setTextColor(194, 152, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(ref, 152, 22);

  doc.setTextColor(100, 82, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('PASSPORT', 152, 33);
  doc.setTextColor(220, 205, 180);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(passenger.passport.toUpperCase(), 152, 39);

  doc.setTextColor(100, 82, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('SEAT', 152, 50);
  doc.setTextColor(194, 152, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('14C', 152, 60);

  doc.setTextColor(100, 82, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('GATE', 178, 50);
  doc.setTextColor(220, 205, 180);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('B7', 178, 60);

  // ── DRAWN BARCODE ──
  const barStartX = 150;
  const barY = 72;
  const barH = 10;
  const chars = 'SKY' + ref.replace('NXT-', '');
  let bX = barStartX;

  for (const char of chars) {
    const code = char.charCodeAt(0);
    const w = code % 3 === 0 ? 1.2 : code % 3 === 1 ? 0.6 : 0.9;
    const gap = code % 2 === 0 ? 0.8 : 0.5;
    doc.setFillColor(194, 152, 60);
    doc.rect(bX, barY, w, barH, 'F');
    bX += w + gap;
    doc.setFillColor(80, 65, 50);
    doc.rect(bX, barY, 0.3, barH, 'F');
    bX += 0.6;
  }

  doc.setTextColor(80, 65, 50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.text(ref, 175, 86);

  // ── FINE PRINT ──
  doc.setTextColor(60, 50, 40);
  doc.setFontSize(4.5);
  doc.text(
    'This is a test boarding pass generated by Skyway. Not valid for actual travel.',
    10,
    H - 3
  );

  doc.save(`nextrip-boarding-pass-${ref}.pdf`);
}