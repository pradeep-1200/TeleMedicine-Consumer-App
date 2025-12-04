import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

interface DisclaimerModalProps {
  visible: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  visible,
  onClose,
  onProceed,
}) => {
  const handleOpenTerms = () => {
    Linking.openURL('https://example.com/terms');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="warning" size={32} color={Colors.warning} />
            <Text style={styles.title}>Disclaimer</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.text}>
              By continuing, you consent to this call being recorded for quality and support purposes. 
              Please provide accurate details to help the doctor assist you effectively.
            </Text>
            
            <TouchableOpacity onPress={handleOpenTerms}>
              <Text style={styles.linkText}>Read Terms & Conditions...</Text>
            </TouchableOpacity>

            {/* Important Points */}
            <View style={styles.pointsContainer}>
              <View style={styles.pointRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.pointText}>Your privacy is protected</Text>
              </View>
              <View style={styles.pointRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.pointText}>Recording used only for quality purposes</Text>
              </View>
              <View style={styles.pointRow}>
                <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                <Text style={styles.pointText}>Data encrypted and secured</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton} onPress={onProceed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginTop: 12,
  },
  content: {
    padding: 24,
  },
  text: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    marginBottom: 16,
  },
  linkText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 24,
  },
  pointsContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 16,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 8,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.mediumGray,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.mediumGray,
  },
  cancelButtonText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
  proceedButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisclaimerModal;