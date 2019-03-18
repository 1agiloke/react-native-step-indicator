import React, { Component } from 'react';
import { View, Text, Image, ScrollView,} from 'react-native';
import { Container, Button, Item, Label, Input } from 'native-base';
import ToolBar from './../ToolBar';
import styles from './style';
import StepIndicator from 'react-native-step-indicator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './../../utils/ResponosiveView';
import FancyTextField from './../InputField';

import Caution from './../Caution';

const types = {
    bca: { logo: require('./../../assets/images/img_bca.png'), dName: 'Bank BCA', accountNumber: '5485 123456', accountName: 'PT. Payment Indonesia' },
    bni: { logo: require('./../../assets/images/img_bni.png'), dName: 'Bank BNI', accountNumber: '9001 654321', accountName: 'PT. Payment Indonesia' },
    mandiri: { logo: require('./../../assets/images/img_mandiri.png'), dName: 'Bank Mandiri', accountNumber: '107 00045123', accountName: 'PT. Payment Indonesia' },
    bni_va: { logo: require('./../../assets/images/img_bni.png'), dName: 'BNI Virtual Account', accountNumber: '9001 654321', accountName: 'Username' },
}

const steps = {
    bni_va: [
        'Pada menu utama, pilih Menu Lainnya.',
        'Pilih Transfer.',
        'Pilih Rekening Tabungan.',
        'Pilih Ke Rekening BNI.',
        'Masukkan nomor Virtual Account dan pilih Tepat Jika Benar.',
        'Masukkan jumlah tagihan yang akan anda bayar secara lengkap. Pembayaran dengan jumlah tidak sesuai akan otomatis ditolak.',
        'Jumlah yang dibayarkan, nomor rekening dan nama Merchant akan ditampilkan. Jika informasi telah sesuai, tekan Ya.',
        'Transaksi Anda sudah selesai.',
    ]
}

const stepStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    separatorStrokeUnfinishedWidth: 0,
    separatorStrokeFinishedWidth: 0,
    currentStepStrokeWidth: 5,
    stepStrokeWidth: 0,
    stepStrokeCurrentColor: '#58c75b',
    stepStrokeFinishedColor: '#58c75b',
    stepStrokeUnFinishedColor: '#58c75b',
    separatorFinishedColor: '#58c75b',
    separatorUnFinishedColor: '#a4d4a5',
    stepIndicatorFinishedColor: '#58c75b',
    stepIndicatorUnFinishedColor: '#a4d4a5',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: '#000000',
    labelSize: hp(1.5),
    labelAlign: 'flex-start',
    labelTextAlign: 'left',
    labelTextAlignVertical: 'center',
    labelHeight: hp(7),
    currentStepLabelColor: '#58c75b'
}

export default class TopupSettlement extends Component {
    constructor(props){
        super(props);
        this.bankType = props.navigation.getParam('bank', 'bca');
        this.amount = props.navigation.getParam('amount', 0);
        this.state = {
            nominalD: 'Rp. '+this.amount,
            nominal: 0
        }
    }

    toolbarTitle = ()=>{
        return (
            <Text style={styles.toolbarTitle}>Top Up</Text>
        )
    }

    render(){
        return (
            <Container>
                <ToolBar type='back' body={this.toolbarTitle()} {...this.props}/>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={types[this.bankType].logo} style={styles.logo}/>
                    <View style={styles.content}>
                        <View style={styles.paymentContainer}>
                            {/* <View style={[styles.row, styles.spaceB, styles.topupAmount]}>
                                <Text style={styles.amountText}>TOP UP</Text>
                                <Text style={styles.amountText}>Rp. {parseFloat(this.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                            </View> */}
                            <View style={[styles.row, styles.spaceB]}>
                                <Text style={styles.infoLabel}>{types[this.bankType].dName}</Text>
                                <Text style={styles.textBold}>{types[this.bankType].accountNumber}</Text>
                            </View>
                            <View style={[styles.row, styles.spaceB]}>
                                <Text style={styles.infoLabel}>Nama Penerima</Text>
                                <Text style={styles.textBold}>{types[this.bankType].accountName}</Text>
                            </View>
                            {
                                this.bankType !== 'bni_va' ? (
                                    <View style={styles.form}>
                                        <Item stackedLabel style={styles.inputGroup}>
                                            <Label style={styles.label}>Jumlah Topup</Label>                            
                                            <Input placeholder="" placeholderTextColor={'lightgrey'} style={[styles.input, {fontFamily: 'Roboto-Bold'}]} keyboardType='phone-pad'
                                                value={this.state.nominalD} 
                                                maxLength={15} 
                                                onChangeText={(text)=>{
                                                    let _nominal = text.replace(/[\D.]/g, '').replace(/^0+/g, '');
                                                    console.log('nominal: ', _nominal);
                                                    let _nominalD = parseFloat(_nominal.length&&!isNaN(_nominal)?_nominal:0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                                    console.log('new nominal: ', _nominal);
                                                    this.setState({nominalD: 'Rp. '+_nominalD, nominal: _nominal});
                                                }}
                                            />
                                        </Item>
                                        <Item stackedLabel style={[styles.inputGroup, styles.inputMargin]}>
                                            <Label style={styles.label}>Nama Pengirim</Label>                            
                                            <Input placeholder="" placeholderTextColor={'lightgrey'} style={styles.input}/>
                                        </Item>
                                        <Item stackedLabel style={[styles.inputGroup, styles.inputMargin]}>
                                            <Label style={styles.label}>Nomor Akun</Label>                            
                                            <Input placeholder="" placeholderTextColor={'lightgrey'} style={styles.input} keyboardType='phone-pad'/>
                                        </Item>
                                    </View>
                                ) : (
                                    <View style={styles.form}>
                                        <StepIndicator
                                            customStyles={stepStyles}
                                            direction='vertical'
                                            stepCount={steps[this.bankType].length}
                                            currentPosition={steps[this.bankType].length}
                                            labels={steps[this.bankType]}
                                        />
                                    </View>
                                )
                            }
                            <Caution style={styles.caution} text={'Harap isi Nama Pengirim dan Nomor Akun dengan benar untuk memudahkan kami mengidentifikasi transaksi anda'}/>
                        </View>
                        <Button rounded block style={[styles.yellowButton]} 
                            onPress={()=>{
                                this.props.navigation.navigate('TopupFinish', {bank: this.bankType, amount: this.amount})
                            }}
                        >
                            <Text style={styles.textBold}>Finish</Text>
                        </Button>
                    </View>
                </View>
                </ScrollView>
            </Container>
        )
    }
}
