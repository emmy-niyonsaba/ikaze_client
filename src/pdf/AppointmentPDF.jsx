import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import logo from '../assets/images/RP_Logo.jpeg';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  logoSection: { flexDirection: 'column' },
  collegeName: { fontSize: 16, fontWeight: 'bold', color: '#1e40af' },
  refNumber: { fontSize: 10, color: '#6b7280', marginTop: 4 },
  qrSection: { alignItems: 'center' },
  qrCode: { width: 80, height: 80 },
  
  sectionTitle: { fontSize: 12, fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: 5, marginTop: 20, marginBottom: 10, textTransform: 'uppercase' },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  gridItem: { width: '50%', marginBottom: 8 },
  label: { fontSize: 8, color: '#6b7280', textTransform: 'uppercase' },
  value: { fontSize: 10, fontWeight: 'bold', color: '#111827' },
  
  descriptionBox: { 
    padding: 10, 
    borderWidth: 1,               // Changed from border
    borderColor: '#e5e7eb', 
    borderStyle: 'solid',         // Added style
    borderRadius: 4, 
    marginTop: 5 
  },
  descriptionText: { fontSize: 9, color: '#374151', lineHeight: 1.4 },
  
  guestRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#f3f4f6', 
    borderBottomStyle: 'solid',   // Added style
    paddingVertical: 4 
  },
  guestName: { fontSize: 9, width: '70%' },
  guestId: { fontSize: 9, width: '30%', color: '#6b7280' },
  
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 40, 
    right: 40, 
    borderTopWidth: 1,            // Changed from borderTop
    borderTopColor: '#e5e7eb', 
    borderTopStyle: 'solid',      // Added style
    paddingTop: 10, 
    textAlign: 'center' 
  },
  footerText: { fontSize: 8, color: '#9ca3af' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', // Align items vertically
    borderBottomWidth: 2,
    borderBottomColor: '#1e40af', 
    borderBottomStyle: 'solid',
    paddingBottom: 10, 
    marginBottom: 20 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logoImage: {
    width: 200,
    height: 80,
    objectFit: 'contain'
  }
});


const AppointmentPDF = ({ data }) => {
  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    // Generate QR code: data includes the reference and a link
    const generateQR = async () => {
      try {
        // const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";
        const url = await QRCode.toDataURL(`${data.referenceNumber}`);
        setQrSrc(url);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();
  }, [data]);

  const guests = typeof data.guests === 'string' ? JSON.parse(data.guests) : data.guests;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logoImage} />
            <View style={styles.logoSection}>
              <Text style={styles.collegeName}>RP - {data.rpCollege}</Text>
              <Text style={styles.refNumber}>Official Appointment </Text>
            </View>
          </View>
          
          <View style={styles.qrSection}>
            {qrSrc && <Image src={qrSrc} style={styles.qrCode} />}
          </View>
        </View>


        {/* Appointment Details */}
        <Text style={styles.sectionTitle}>Appointment Information</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Type</Text>
            <Text style={styles.value}>{data.type}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{data.department}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Start Time</Text>
            <Text style={styles.value}>{new Date(data.startTime).toLocaleString()}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>End Time</Text>
            <Text style={styles.value}>{new Date(data.endTime).toLocaleString()}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Purpose of Visit</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{data.description}</Text>
        </View>

        {/* Guests */}
        {guests && guests.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Accompanied Guests</Text>
            <View style={{ marginBottom: 10 }}>
              {guests.map((g, i) => (
                <View key={i} style={styles.guestRow}>
                  <Text style={styles.guestName}>{i + 1}. {g.fullname}</Text>
                  <Text style={styles.guestId}>ID: {g.id}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Issued on: {new Date(data.createdAt).toLocaleDateString()}
          </Text>
          <Text style={[styles.footerText, { marginTop: 2 }]}>
            Please present this pass and a valid ID at the security desk.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default AppointmentPDF;