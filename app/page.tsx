"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

const steps = [
  { id: 1, title: "Chọn vấn đề cần thăm khám", color: "bg-red-600" },
  { id: 2, title: "Chọn giờ khám", color: "bg-gray-400" },
  { id: 3, title: "Thông tin cá nhân", color: "bg-gray-400" },
  { id: 4, title: "Hoàn thành", color: "bg-gray-400" },
]

const hospitals = [
  "Bệnh viện Bạch Mai",
  "Bệnh viện Việt Đức",
  "Bệnh viện K",
  "Bệnh viện Chợ Rẫy",
  "Bệnh viện Đại học Y Hà Nội",
]

const issues = [
  "Khám tổng quát",
  "Tim mạch",
  "Tiêu hóa",
  "Hô hấp",
  "Thần kinh",
  "Da liễu",
  "Mắt",
  "Tai mũi họng",
  "Xương khớp",
  "Nội tiết",
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedHospital, setSelectedHospital] = useState("")
  const [selectedIssue, setSelectedIssue] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return selectedHospital && selectedIssue
      case 2:
        return selectedDate && selectedTime
      case 3:
        return personalInfo.fullName && personalInfo.phone
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">Vui lòng chọn bệnh viện và vấn đề cần thăm khám.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Chọn bệnh viện</Label>
                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn bệnh viện" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital} value={hospital}>
                        {hospital}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Vấn đề</Label>
                <Select value={selectedIssue} onValueChange={setSelectedIssue}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn vấn đề" />
                  </SelectTrigger>
                  <SelectContent>
                    {issues.map((issue) => (
                      <SelectItem key={issue} value={issue}>
                        {issue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">Chọn ngày và giờ khám phù hợp với lịch trình của bạn.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Chọn ngày khám</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Chọn giờ khám</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600 mb-6">Vui lòng điền thông tin cá nhân để hoàn tất việc đặt lịch khám.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Họ và tên *</Label>
                <Input
                  placeholder="Nhập họ và tên"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-red-600 font-medium">Số điện thoại *</Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Email</Label>
                <Input
                  placeholder="Nhập email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 font-medium">Địa chỉ</Label>
                <Input
                  placeholder="Nhập địa chỉ"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-600 font-medium">Ghi chú</Label>
                <Input
                  placeholder="Ghi chú thêm (nếu có)"
                  value={personalInfo.notes}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, notes: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Đặt lịch thành công!</h3>
            <p className="text-gray-600">
              Cảm ơn bạn đã đặt lịch khám. Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn.
            </p>

            <Card className="text-left max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-lg">Thông tin lịch khám</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <strong>Bệnh viện:</strong> {selectedHospital}
                </div>
                <div>
                  <strong>Vấn đề:</strong> {selectedIssue}
                </div>
                <div>
                  <strong>Ngày khám:</strong> {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: vi }) : ""}
                </div>
                <div>
                  <strong>Giờ khám:</strong> {selectedTime}
                </div>
                <div>
                  <strong>Họ tên:</strong> {personalInfo.fullName}
                </div>
                <div>
                  <strong>Điện thoại:</strong> {personalInfo.phone}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">ĐẶT HẸN KHÁM</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                      step.id <= currentStep ? "bg-red-600" : "bg-gray-400"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${step.id === currentStep ? "text-red-600" : "text-gray-500"}`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${step.id < currentStep ? "bg-red-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="px-8 bg-transparent">
            Quay lại
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleContinue} disabled={!canContinue()} className="bg-red-600 hover:bg-red-700 px-8">
              TIẾP TỤC
            </Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentStep(1)
                setSelectedHospital("")
                setSelectedIssue("")
                setSelectedDate(undefined)
                setSelectedTime("")
                setPersonalInfo({
                  fullName: "",
                  phone: "",
                  email: "",
                  address: "",
                  notes: "",
                })
              }}
              className="bg-red-600 hover:bg-red-700 px-8"
            >
              Đặt lịch mới
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
