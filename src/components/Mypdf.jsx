import React from 'react'
import { PDFViewer, Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';
import img3 from '../assets/img88.jpg'



const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    justifyContent: "start",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontStyle: "Poppins",
    textAlign: "justify",
    fontSize: "20px"
  },
  view: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  img: {
    maxWidth: "600px", 
    maxHeight: "400"
  }
});

export const Mypdf = ({ data }) => {


  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.text}>Resultados de tu evaluación</Text>
          <View style={styles.view}>
            <img src={img3} style={styles.img}/>
            <Text>{data}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
