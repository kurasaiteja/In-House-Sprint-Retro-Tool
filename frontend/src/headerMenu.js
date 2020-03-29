import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link} from 'react-router'



const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '-70px'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    item: {
        display: 'inline - block',
        verticaAlign: 'middle'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    select: {
        '&:before': {
            borderColor: '#fff',
        },
        '&:after': {
            borderColor: 'white',
        }
    },
    icon: {
        fill: 'white'
    },
    },
}));

export default function PrimarySearchAppBar({onChange,sorted}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open,setOpen] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const closeAlert = event => {
        setOpen(false);
        console.log(open)
    }
    const copyLink = event => {
        var dummy = document.createElement('input'),
            text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setOpen(true);        
        };
    const exporttoPDF = event => {
        
        const len = 1; //$x(".//body/div/div").length
    const pdf = new jsPDF('p', 'mm','a4');
    const position = 0;
    //Hide
    for (let i = 1;i  <= len; i++){
        html2canvas(document.getElementById('cards'),
            {dpi: 300, // Set to 300 DPI
            scale: 2 // Adjusts your resolution
            }).then(canvas => {
            pdf.addImage(canvas.toDataURL("images/png", 1), 'PNG', 0,position, 210, 295);

            if (i == len){
                pdf.save('sample-file.pdf');
            }else{
                pdf.addPage();
            }
        });
     }
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <MenuItem>
        <Link to="/boards">
            Boards
        </Link>
        </MenuItem>
            
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleMenuClose} linkbutton="true" href="/boards">Boards</MenuItem>
            
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" style={{margin:'0px'}}>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MenuIcon />


                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        Sprint Retro
                     </Typography>
                     <div style={{marginLeft:'30px'}}>
                     <FormControl variant="filled" color="inherit" style={{width:'20em'}}>
                        <InputLabel id="filled-age-native-simple'">Sort by</InputLabel>
                        <Select 
                          onChange={onChange}
                          value={sorted}
                          style={{backgroundColor:"white"}}
                          labelId="filled-age-native-simple'"
                          id="filled-age-native-simple'"
                          label="Sort by"
                        >
                          <MenuItem value={"date"}>CreatedDate</MenuItem>
                          <MenuItem value={"votes"}>Votes</MenuItem>
                        </Select>
                      </FormControl>
                      </div>
                    
                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        {window.location.pathname.length > 7 ?
                                <div className={classes.container}>
                                <Collapse in={open} className={classes.item} >
                                <Alert
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={closeAlert}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    Link copied!
                                    </Alert>
                            </Collapse>
                                <IconButton color="inherit" onClick={copyLink} className={classes.item}>
                            <Badge color="secondary">
                             <ShareIcon />
                            </Badge>
                                </IconButton>
                                <IconButton className={classes.item} color="inherit" onClick={exporttoPDF}>
                                    <Badge color="secondary">
                                        <PictureAsPdfIcon />
                                    </Badge>
                                </IconButton></div>
                                : <p></p>}
                         


                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
