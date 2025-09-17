Conexión código a mercado pago:

<?php
require __DIR__ . '/vendor/autoload.php';

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

// Configura tus credenciales
MercadoPagoConfig::setAccessToken('APP_USR-8733978112569923-062512-93f26bd550a0cc81991b50b51fd786fc-1577049737');

// Crea una preferencia
$client = new PreferenceClient();
$preference = $client->create([
    "items" => [
        [
            "title" => "Mi producto",
            "quantity" => 1,
            "unit_price" => 2000
        ]
    ],
    "back_urls" => [
        "success" => "http://localhost/integramp/in.php",
        "failure" => "https://www.tu-sitio.com/failure",
        "pending" => "https://www.tu-sitio.com/pending"
    ],
    "auto_return" => "approved"
]);

$preferenceId = $preference->id;
?>

<!DOCTYPE html>
<html>
<head>
  <title>Mi Integración con Checkout Pro</title>
</head>
<body>

  <h1>Botón de pago</h1>
  <div id="walletBrick_container"></div>

  <!-- SDK de Mercado Pago -->
  <script src="https://sdk.mercadopago.com/js/v2"></script>
  <script>
    const mp = new MercadoPago('APP_USR-d0d1b2d6-a42c-4504-8218-b2b052391fbb');

    const renderWalletBrick = async (bricksBuilder) => {
      await bricksBuilder.create("wallet", "walletBrick_container", {
        initialization: {
          preferenceId: "<?php echo $preferenceId; ?>",
        }
      });
    };

    const bricksBuilder = mp.bricks();
    renderWalletBrick(bricksBuilder);
  </script>

</body>
</html>
