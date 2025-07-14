import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';

interface QRCodeProps {
  amount: number;
}

export function QRCode({ amount }: QRCodeProps) {
  const villa = useSelector((state: RootState) => state.villa.villa);
  const qrImage = villa?.promptPay?.qrImage;
  const { t } = useTranslation();
  


  // Ensure amount is a valid number
  const safeAmount = typeof amount === 'number' ? amount : 0;

  const handleDownload = () => {
    if (!qrImage) return;
    
    // Create a link element
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'promptpay-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!qrImage) {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center space-y-4"
    >
      <div className="relative w-full max-w-[280px] mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6a8f6f]/20 to-[#a7c0cd]/20 rounded-2xl blur-xl" />
        <div className={cn(
          "relative w-full",
          "bg-white dark:bg-gray-800",
          "rounded-2xl shadow-lg",
          "p-4",
          "flex flex-col items-center",
          "space-y-3"
        )}>
          <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden">
            <img
              src={qrImage}
              alt="PromptPay QR Code"
              className="w-full h-full"
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600 dark:text-gray-400">PromptPay</div>
            <div className="text-lg font-semibold bg-gradient-to-r from-[#6a8f6f] to-[#a7c0cd] bg-clip-text text-transparent">
              {new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB'
              }).format(safeAmount)}
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        variant="outline"
        className={cn(
          "group relative",
          "w-full max-w-[280px]",
          "py-2 px-4",
          "bg-white/90 dark:bg-gray-800/90",
          "hover:bg-[#6a8f6f]/10 dark:hover:bg-[#6a8f6f]/20",
          "border-2 border-[#6a8f6f]/20",
          "rounded-xl",
          "transition-all duration-300",
          "flex items-center justify-center space-x-2"
        )}
      >
        <Download className="w-4 h-4 text-[#6a8f6f] group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {t('common.downloadqrcode')}
        </span>
      </Button>
    </motion.div>
  );
}