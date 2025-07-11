# Appointment Booking Template

A modern, responsive appointment booking system built with Next.js and React. This template provides a complete 4-step booking flow that can be easily customized for medical appointments, consultations, or any service-based bookings.

<img width="1128" height="552" alt="image" src="https://github.com/user-attachments/assets/d708271d-9175-4f94-9761-3056ad4d587e" />

<img width="1395" height="906" alt="image" src="https://github.com/user-attachments/assets/3eae8713-8831-4a9d-b662-ff39fd3f1356" />

## Features

- **4-Step Booking Process**: Intuitive step-by-step flow
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Multi-language Ready**: Currently in Vietnamese, easily translatable
- **Form Validation**: Real-time validation at each step
- **Date & Time Selection**: Interactive calendar and time slot picker
- **Progress Tracking**: Visual progress indicator
- **Booking Confirmation**: Complete summary with all details
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lazzerex/next-appointment-booking.git
   cd next-appointment-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Booking Flow

### Step 1: Choose Service & Provider
- Select hospital/clinic from dropdown
- Choose medical issue or service type
- Form validation ensures both fields are selected

### Step 2: Select Date & Time
- Interactive calendar for date selection
- Available time slots displayed
- Prevents booking past dates

### Step 3: Personal Information
- Required: Full name and phone number
- Optional: Email, address, and notes
- Real-time form validation

### Step 4: Confirmation
- Complete booking summary
- Success confirmation message
- Option to book another appointment

## Customization

### Changing Services/Providers

Edit the data arrays in `app/page.tsx`:

```javascript
const hospitals = [
  "Your Hospital 1",
  "Your Hospital 2",
  // Add your providers
]

const issues = [
  "Service 1",
  "Service 2", 
  // Add your services
]
```

### Modifying Time Slots

Update the available time slots:

```javascript
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  // Add your time slots
]
```

### Styling & Branding

- **Colors**: Modify the red theme in Tailwind classes
- **Logo**: Add your logo to the header
- **Fonts**: Change fonts in `app/layout.tsx`
- **Language**: Translate text strings throughout the components

### Form Fields

Add or remove form fields in Step 3:

```javascript
const [personalInfo, setPersonalInfo] = useState({
  fullName: "",
  phone: "",
  email: "",
  // Add your custom fields
})
```

## Internationalization

The template is currently in Vietnamese but can be easily translated:

1. Create language files in `/locales`
2. Replace hardcoded strings with translation keys
3. Use libraries like `next-i18next` for full i18n support

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Language**: TypeScript

## Components

### Core Components
- `AppointmentBooking`: Main booking component
- `StepIndicator`: Progress visualization
- `DatePicker`: Calendar integration
- `TimeSlots`: Available time selection

### UI Components (shadcn/ui)
- Button, Card, Input, Label
- Select, Calendar, Popover
- All components are customizable

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Backend Integration

This template is frontend-only. To add backend functionality:

### Option 1: Next.js API Routes
Create API routes in `app/api/`:

```javascript
// app/api/appointments/route.ts
export async function POST(request: Request) {
  const appointment = await request.json()
  // Save to database
  return Response.json({ success: true })
}
```

### Option 2: External API
Integrate with your existing backend:

```javascript
const saveAppointment = async (appointmentData) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData)
  })
  return response.json()
}
```

### Option 3: Database Integration
Popular options:
- **Supabase**: Real-time database
- **PlanetScale**: MySQL platform
- **MongoDB Atlas**: NoSQL database
- **Firebase**: Google's platform

## Database Schema

Suggested appointment table structure:

```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  hospital VARCHAR(255) NOT NULL,
  issue VARCHAR(255) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon set
- [Next.js](https://nextjs.org/) for the React framework

## Support

If you have any questions or need help customizing this template:

- Email: nambinh236@gmail.com
- Issues: [GitHub Issues](https://github.com/lazzerex/next-appointment-booking/issues)
- Discussions: [GitHub Discussions](https://github.com/lazzerex/next-appointment-booking/discussions)

## Changelog

### v1.0.0
- Initial release
- 4-step booking flow
- Responsive design
- Form validation
- Vietnamese language support

---

**Star this repository if it helped you!**

Made with ❤️ for the developer community
```

