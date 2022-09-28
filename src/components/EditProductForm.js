import React, { useEffect, useState, useContext, LogBox } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Switch, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import * as Yup from 'yup'
import openGallery from './OpenGallery';
import uploadImage from './UploadImage';
import uploadData from './UploadData';
import { RefresherContext } from '../Contexts/RefresherContext';
import { ProductInfoContext } from '../Contexts/ProductInfoContext';
