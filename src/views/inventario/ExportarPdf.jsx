import React, { useEffect, useState } from 'react'
import logo from './../../assets/images/logo/logo.png'
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';
import { File, FileText } from 'react-feather';
const ExportarPdf = ({ propiedades, espacios }) => {

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            margin: 10,
            marginBottom: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        logo: {
            width: 100,
            height: 100,
        },
        content: {
            margin: 10,
        },
        page: {
            flexDirection: 'row',
            backgroundColor: '#ffffff',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            padding: 20,
        },
        propertyDetails: {
            flex: 1,
        },
        sectionTitle: {
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 5,
        },
        imageContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: '500px',
        },
        imageGallery: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        },
        galleryImage: {
            width: '300px',
            height: 'auto',
            marginRight: '10px',
            border: '',
            boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
        },
        normal: {
            fontSize: '10px',
            borderBottom: '0.5px solid #efdfd0',
            fontWeight: 'normal',
            marginBottom: '10px'
        }
    });
    const MyDocument = () => (
        <Document>
            <Page>
                <View size="A4" style={styles.header}>
                    {/* <Text style={styles.title}>{propiedades?.publicidad?.encabezado}</Text> */}
                    <Text style={styles.title}>{propiedades?.publicidad?.encabezado}</Text>
                    <Image style={styles.logo} src={logo} />
                </View>
                <View style={styles.container}>
                    <View style={styles.propertyDetails}>
                        <Text style={styles.normal}>Precio: {propiedades?.publicidad?.precio_venta}</Text>
                        <Text style={styles.normal}>{propiedades?.publicidad?.descripcion}</Text>
                        <Text style={styles.normal}>Con las siguientes características:</Text>
                        <Text style={styles.normal}>Mascotas: {propiedades?.caracteristica?.mascotas}</Text>

                        <Text style={styles.sectionTitle}>Espacios:</Text>


                        {/* {espacios && JSON.parse(JSON.stringify(espacios)).map((item, index) => (
                            <Text key={index}>- {item}</Text>
                        ))} */}

                        {/* <Text style={styles.sectionTitle}>Instalaciones:</Text>
                        {instalaciones?.map((item, index) => (
                            <Text key={index}>- {item}</Text>
                        ))}

                        <Text style={styles.sectionTitle}>Restricciones:</Text>
                        {resctricciones?.map((item, index) => (
                            <Text key={index}>- {item}</Text>
                        ))} */}

                        <Text style={styles.sectionTitle}>Básicos:</Text>
                        <Text>Superficie del terreno: {propiedades?.basico?.superficie_terreno}</Text>
                        <Text>Superficie de construcción: {propiedades?.basico?.superficie_construccion}</Text>
                        <Text>Baños: {propiedades?.basico?.banios}</Text>
                        <Text>Medios Baños: {propiedades?.basico?.medios_banios}</Text>
                        <Text>Recamaras: {propiedades?.basico?.recamaras}</Text>
                        <Text>Cocinas: {propiedades?.basico?.cocinas}</Text>
                        <Text>Estacionamiento: {propiedades?.basico?.estacionamiento}</Text>
                        <Text>Niveles construidos: {propiedades?.basico?.niveles_construidos}</Text>
                        <Text>Número de casas: {propiedades?.basico?.numero_casas}</Text>
                        <Text>Número de elevadores: {propiedades?.basico?.numero_elevadores}</Text>
                        <Text>Piso Ubicado: {propiedades?.basico?.piso_ubicado}</Text>
                    </View>

                    <View style={styles.imageContainer}>
                        <Image
                            src={`https://backend.alven-inmobiliaria.com.mx/storage/${propiedades?.id}/${propiedades?.foto[0]?.fotos}`}
                            style={styles.image}
                        />

                        {/* <Text style={styles.sectionTitle}>Galería de fotos</Text>
                                <View style={styles.imageGallery}>
                                    {propiedades?.foto?.map((foto, index) => (
                                        <Image
                                            key={index}
                                            src={`https://backend.alven-inmobiliaria.com.mx/storage/${propiedades?.id}/${foto?.fotos}`}
                                            style={styles.galleryImage}
                                        />
                                    ))}
                                </View> */}
                    </View>
                </View>
            </Page>
        </Document>
    );
    return (
        <>
            <PDFDownloadLink document={<MyDocument />} fileName="mi-archivo.pdf" className='btn btn-success mb-1'>
                {({ loading }) => (loading ? 'Generando PDF...' : <FileText />)}
            </PDFDownloadLink>

        </>
    )
}

export default ExportarPdf