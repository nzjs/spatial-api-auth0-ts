PGDMP                         y        	   pg31_test    12.6    12.6     c           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            d           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            e           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            f           1262    16393 	   pg31_test    DATABASE     �   CREATE DATABASE pg31_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_New Zealand.1252' LC_CTYPE = 'English_New Zealand.1252';
    DROP DATABASE pg31_test;
                postgres    false            g           0    0 	   pg31_test    DATABASE PROPERTIES     T   ALTER DATABASE pg31_test SET search_path TO '$user', 'public', 'topology', 'tiger';
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            h           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    14            "           1259    18945    ha_pois    TABLE       CREATE TABLE public.ha_pois (
    id bigint,
    uid character varying,
    type character varying,
    name character varying,
    notes character varying,
    ts bigint,
    image character varying,
    geomstr character varying,
    geom public.geometry(Point,4326)
);
    DROP TABLE public.ha_pois;
       public         heap    postgres    false    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14            #           1259    18951 	   ha_tracks    TABLE     	  CREATE TABLE public.ha_tracks (
    id bigint,
    uid character varying,
    name character varying,
    notes character varying,
    tsstart bigint,
    tsend bigint,
    length integer,
    geomstr character varying,
    geom public.geometry(LineString,4326)
);
    DROP TABLE public.ha_tracks;
       public         heap    postgres    false    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14            _          0    18945    ha_pois 
   TABLE DATA           W   COPY public.ha_pois (id, uid, type, name, notes, ts, image, geomstr, geom) FROM stdin;
    public          postgres    false    290            `          0    18951 	   ha_tracks 
   TABLE DATA           `   COPY public.ha_tracks (id, uid, name, notes, tsstart, tsend, length, geomstr, geom) FROM stdin;
    public          postgres    false    291            �          0    18379    pointcloud_formats 
   TABLE DATA           @   COPY public.pointcloud_formats (pcid, srid, schema) FROM stdin;
    public          postgres    false    238            �          0    16701    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    217            _   �  x����k�0��W���'==I�yv�[t��ڃ+�!��������䦃��.�c����3���S`X{H[�K�;�P��^�ȫ�4]w�.��c�b���#�v���4�c8ĕg�o������b?�����E�%�C*��*���C>4߁�#��8�i�	ՂPh4����yM�bIσ���eI��B7Xj�PWb/02Z������6�Æ�>î|y�z>�����=SeQ�r��m�U ���`,!�S���R��J澔U��Z��� {��k���2�Þ�5Oy���,�}��~�s>�CJ��-_���{?�}�?�pw�'!�s[���~K*��1�?�����-��RfJ��94ijp�6���/�r����4>�Փ�ޭu�Y�,���'���,f��o����      `   �  x�풻n�@Ek�+֊0���wH�.��EE�1��"H��Y�z��4��=swg��b���'�c��?�^�0뺥 `�"[�'���mF�ɷ���u�6��9[>v�>[w�}�I�a�ɓ@#���/���w�����w������ﷻ�,��j�[��!���G�y$2�,(��S�9+����0)���"�N�ǁ��/X@s:a&���DY����.i9GRBc	 �0FN��X<q��D�&募��1� ��_ �4���H���ڙB��J���9 ����[���	 �"����i^�j���4�"@]���� ��+r;���.
Qj}�o�nF=�b�i���o@�-]�����ɮz�FuLkj-�3�UO�ꩿ�c
cx�υ��^5k�����o�S�=:�򎷸����㞮zx�wŝoq�������|:��" �      �      x������ � �      �      x������ � �          c           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            d           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            e           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            f           1262    16393 	   pg31_test    DATABASE     �   CREATE DATABASE pg31_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_New Zealand.1252' LC_CTYPE = 'English_New Zealand.1252';
    DROP DATABASE pg31_test;
                postgres    false            g           0    0 	   pg31_test    DATABASE PROPERTIES     T   ALTER DATABASE pg31_test SET search_path TO '$user', 'public', 'topology', 'tiger';
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            h           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    14            "           1259    18945    ha_pois    TABLE       CREATE TABLE public.ha_pois (
    id bigint,
    uid character varying,
    type character varying,
    name character varying,
    notes character varying,
    ts bigint,
    image character varying,
    geomstr character varying,
    geom public.geometry(Point,4326)
);
    DROP TABLE public.ha_pois;
       public         heap    postgres    false    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14            #           1259    18951 	   ha_tracks    TABLE     	  CREATE TABLE public.ha_tracks (
    id bigint,
    uid character varying,
    name character varying,
    notes character varying,
    tsstart bigint,
    tsend bigint,
    length integer,
    geomstr character varying,
    geom public.geometry(LineString,4326)
);
    DROP TABLE public.ha_tracks;
       public         heap    postgres    false    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14    14            _          0    18945    ha_pois 
   TABLE DATA           W   COPY public.ha_pois (id, uid, type, name, notes, ts, image, geomstr, geom) FROM stdin;
    public          postgres    false    290   l       `          0    18951 	   ha_tracks 
   TABLE DATA           `   COPY public.ha_tracks (id, uid, name, notes, tsstart, tsend, length, geomstr, geom) FROM stdin;
    public          postgres    false    291   �       �          0    18379    pointcloud_formats 
   TABLE DATA           @   COPY public.pointcloud_formats (pcid, srid, schema) FROM stdin;
    public          postgres    false    238   �       �          0    16701    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    217          