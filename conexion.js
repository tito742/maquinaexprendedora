Código de la maquina exprendedora:

 #include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Configuración de la pantalla LCD (dirección 0x27)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Pinos de los botones para seleccionar productos
const int botonA = 2;  // Producto A
const int botonB = 3;  // Producto B
const int botonC = 4;  // Producto C

// Pino del motor de paso o servomotor (depende del tipo de motor)
const int pinMotor = 9;  // Puedo usar un motor de paso o servomotor

// Variables para la cantidad de monedas y el saldo
int monedas = 0;
int saldo = 0;
const int costoProductoA = 5;  // Precio del Producto A
const int costoProductoB = 3;  // Precio del Producto B
const int costoProductoC = 2;  // Precio del Producto C

void setup() {
  // Inicialización de la pantalla LCD
  lcd.begin(16, 2);
  lcd.print("Maquina Expendedora");

  // Configuración de los pines de los botones
  pinMode(botonA, INPUT_PULLUP);
  pinMode(botonB, INPUT_PULLUP);
  pinMode(botonC, INPUT_PULLUP);

  // Inicializar el motor
  pinMode(pinMotor, OUTPUT);

  // Mostrar el saldo inicial
  lcd.setCursor(0, 1);
  lcd.print("Saldo: $");
  lcd.print(saldo);
}

void loop() {
  // Comprobamos si se ha insertado una moneda
  if (digitalRead(5) == LOW) {  // Supón que el pin 5 es un sensor de monedas
    monedas++;
    saldo += 1;  // Asumimos que cada moneda tiene valor de 1
    delay(500);  // Debemos dar tiempo para que el sensor se estabilice

    // Actualizar la pantalla LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Insertando moneda");
    lcd.setCursor(0, 1);
    lcd.print("Saldo: $");
    lcd.print(saldo);
    delay(1000);  // Mostrar por un momento el saldo
    lcd.clear();
    lcd.print("Maquina Expendedora");
  }

  // Verificar si el usuario presiona los botones para seleccionar productos
  if (digitalRead(botonA) == LOW) {
    if (saldo >= costoProductoA) {
      // Despachar producto A
      entregarProducto("Producto A");
      saldo -= costoProductoA;
      actualizarSaldo();
    } else {
      mostrarError("No suficiente saldo");
    }
  }

  if (digitalRead(botonB) == LOW) {
    if (saldo >= costoProductoB) {
      // Despachar producto B
      entregarProducto("Producto B");
      saldo -= costoProductoB;
      actualizarSaldo();
    } else {
      mostrarError("No suficiente saldo");
    }
  }

  if (digitalRead(botonC) == LOW) {
    if (saldo >= costoProductoC) {
      // Despachar producto C
      entregarProducto("Producto C");
      saldo -= costoProductoC;
      actualizarSaldo();
    } else {
      mostrarError("No suficiente saldo");
    }
  }

  // Mantener la pantalla actualizada
  delay(100);
}

// Función para entregar el producto
void entregarProducto(String producto) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Dispensando");
  lcd.setCursor(0, 1);
  lcd.print(producto);

  // Aquí, activa el motor para dispensar el producto.
  // Suponiendo que tienes un servomotor o motor de paso que gire
  digitalWrite(pinMotor, HIGH);
  delay(2000);  // El motor estará encendido durante 2 segundos
  digitalWrite(pinMotor, LOW);
  delay(500);  // Tiempo para que el producto salga
}

// Función para actualizar el saldo en la pantalla LCD
void actualizarSaldo() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Saldo: $");
  lcd.print(saldo);
}
