# Customer App - Telemedicine Application

## 🏥 Complete Telemedicine App Implementation

This is a fully functional React Native telemedicine app built with Expo Router that allows users to:

### ✅ Core Features Implemented

1. **Home Screen** - Browse concerns and quick actions
2. **Doctor Selection** - View doctors by concern with ratings and pricing
3. **Consultation Booking Flow**:
   - Choose consultation type (Phone/Video/Chat)
   - Select date and time slots
   - Enter symptoms and severity
   - Confirm personal details
   - Make payment
   - Success confirmation

4. **My Bookings** - View and manage appointments
5. **Video/Audio Calls** - Integrated with Zego Cloud SDK
6. **Payment System** - Multiple payment methods with wallet integration

### 📱 Screen Flow

```
Home → Select Concern → Doctor List → Schedule → 
Choose Type → Date → Time → Symptoms → Confirm → 
Payment → Success → My Bookings → Call Screen
```

### 🛠 Technical Stack

- **Framework**: React Native with Expo Router
- **Navigation**: File-based routing
- **State Management**: React Context (Auth, Appointments, Call)
- **UI Components**: Custom components with consistent styling
- **Video Calling**: Zego Express Engine
- **Icons**: Expo Vector Icons (Ionicons)

### 📂 Project Structure

```
app/
├── (tabs)/           # Tab navigation screens
├── booking/          # Booking flow screens
├── call/            # Video call screens
├── consultation/    # Doctor consultation screens
└── doctor/          # Doctor details screens

components/
├── cards/           # Reusable card components
├── modals/          # Modal components
└── ui/              # UI components

contexts/
├── AuthContext.tsx      # User authentication
├── AppointmentContext.tsx # Appointment management
└── CallContext.tsx      # Call state management

constants/
├── Color.ts         # App color scheme
└── Config.ts        # App configuration

services/
└── ZegoService.ts   # Video calling service
```

### 🎨 Design Features

- **Consistent Color Scheme**: Primary green theme with proper contrast
- **Responsive Layout**: Works on different screen sizes
- **Intuitive Navigation**: Clear user flow with back buttons
- **Loading States**: Processing indicators for async operations
- **Error Handling**: Proper error messages and fallbacks

### 🔧 Key Components

1. **ConcernCard** - Displays health concerns
2. **AppointmentCard** - Shows appointment details with actions
3. **DisclaimerModal** - Call consent modal
4. **Payment Methods** - Multiple payment options

### 💾 Data Management

- **Mock Data**: Doctors, appointments, and user data
- **Context State**: Persistent state across screens
- **Local Storage**: User preferences and session data

### 🚀 Getting Started

1. Install dependencies: `npm install`
2. Start the app: `npx expo start`
3. Scan QR code with Expo Go app

### 📋 Features Checklist

✅ Home screen with concerns
✅ Doctor listing and selection
✅ Consultation type selection
✅ Date and time booking
✅ Symptoms input form
✅ Payment processing
✅ Appointment management
✅ Video call integration
✅ User authentication
✅ Wallet system
✅ Responsive design
✅ Error handling
✅ Loading states

### 🔮 Future Enhancements

- Push notifications for appointments
- Chat messaging system
- Prescription management
- Medical report uploads
- Doctor reviews and ratings
- Advanced search and filters
- Multi-language support

This app provides a complete telemedicine experience with all the essential features for both patients and healthcare providers.